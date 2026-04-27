// Optimize source assets for the web.
// - Logo PNG  -> WebP responsive (320, 640, 1280) + PNG fallback
// - Hero MP4  -> H.264 720p MP4 + VP9 WebM + WebP poster
// - OG image  -> 1200x630 JPG composed from poster + logo
//
// Run with:  npm run optimize

import { mkdir, stat, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const exec = promisify(execFile);
const FFMPEG = ffmpegInstaller.path;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_LOGO = join(ROOT, 'assets', 'paraíso logo png.png');
const SRC_VIDEO = join(ROOT, 'assets', 'vídeo animado logo.mp4');
const OUT = join(ROOT, 'public', 'media');

const fmtKB = (n) => `${(n / 1024).toFixed(1)} KB`;
const fmtMB = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

async function size(p) {
  try { return (await stat(p)).size; } catch { return 0; }
}

async function ensureOut() {
  await mkdir(OUT, { recursive: true });
}

async function processLogo() {
  console.log('\n[logo] processing...');
  const inputSize = await size(SRC_LOGO);

  // Trim the empty/black surround so the circle becomes the bounding box,
  // then extend to a perfect square so CSS sizing (size-*) renders without
  // distortion no matter the original aspect ratio.
  const trimmedBuf = await sharp(SRC_LOGO)
    .trim({ threshold: 8 })
    .toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();
  const side = Math.max(trimmedMeta.width ?? 0, trimmedMeta.height ?? 0);
  const padX = Math.floor((side - (trimmedMeta.width ?? 0)) / 2);
  const padY = Math.floor((side - (trimmedMeta.height ?? 0)) / 2);
  const squareBuf = await sharp(trimmedBuf)
    .extend({
      top: padY,
      bottom: side - (trimmedMeta.height ?? 0) - padY,
      left: padX,
      right: side - (trimmedMeta.width ?? 0) - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  console.log(`  trimmed -> ${trimmedMeta.width}x${trimmedMeta.height}, squared -> ${side}x${side}`);

  const widths = [320, 640, 1280];
  const tasks = widths.map(async (w) => {
    const out = join(OUT, `logo-${w}.webp`);
    await sharp(squareBuf)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(out);
    const s = await size(out);
    console.log(`  logo-${w}.webp -> ${fmtKB(s)}`);
    return s;
  });
  const sizes = await Promise.all(tasks);

  // PNG fallback for browsers without WebP support (rare).
  const pngOut = join(OUT, 'logo.png');
  await sharp(squareBuf)
    .resize({ width: 480, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile(pngOut);
  const pngSize = await size(pngOut);
  console.log(`  logo.png       -> ${fmtKB(pngSize)} (fallback)`);

  const total = sizes.reduce((a, b) => a + b, 0) + pngSize;
  console.log(`[logo] in ${fmtMB(inputSize)} -> out ${fmtKB(total)} (${((1 - total / inputSize) * 100).toFixed(0)}% smaller)`);
}

async function runFfmpeg(args, label) {
  process.stdout.write(`  ${label}... `);
  try {
    await exec(FFMPEG, args, { maxBuffer: 64 * 1024 * 1024 });
    process.stdout.write('done\n');
  } catch (err) {
    process.stdout.write('FAILED\n');
    console.error(err.stderr?.toString().split('\n').slice(-15).join('\n') || err.message);
    throw err;
  }
}

async function processVideo() {
  console.log('\n[hero video] processing...');
  const inputSize = await size(SRC_VIDEO);

  const mp4Out = join(OUT, 'hero.mp4');
  const webmOut = join(OUT, 'hero.webm');
  const posterRaw = join(OUT, '_poster_raw.png');
  const posterOut = join(OUT, 'hero-poster.webp');

  // 1) MP4 H.264 720p, faststart for streaming
  await runFfmpeg([
    '-y', '-i', SRC_VIDEO,
    '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2",
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '24',
    '-pix_fmt', 'yuv420p',
    '-an', // no audio (logo loop)
    '-movflags', '+faststart',
    mp4Out,
  ], 'hero.mp4 (H.264 720p)');

  // 2) WebM VP9
  await runFfmpeg([
    '-y', '-i', SRC_VIDEO,
    '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2",
    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34',
    '-deadline', 'good', '-cpu-used', '2',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-row-mt', '1',
    webmOut,
  ], 'hero.webm (VP9)');

  // 3) Poster: extract a representative frame at 0.5s
  await runFfmpeg([
    '-y', '-ss', '00:00:00.500', '-i', SRC_VIDEO,
    '-vframes', '1',
    '-vf', "scale='min(1920,iw)':-2",
    posterRaw,
  ], 'poster frame');

  await sharp(posterRaw).webp({ quality: 80, effort: 6 }).toFile(posterOut);

  // Pre-blurred low-res variant for mobile background — replaces a runtime
  // CSS filter: blur on a <video>, which is brutal on mobile GPUs.
  const posterBlurOut = join(OUT, 'hero-poster-blur.webp');
  await sharp(posterRaw)
    .resize({ width: 1024 })
    .blur(40)
    .modulate({ brightness: 0.85, saturation: 1.1 })
    .webp({ quality: 65, effort: 6 })
    .toFile(posterBlurOut);

  await rm(posterRaw, { force: true });

  const mp4Size = await size(mp4Out);
  const webmSize = await size(webmOut);
  const posterSize = await size(posterOut);

  const posterBlurSize = await size(posterBlurOut);
  console.log(`  hero.mp4              -> ${fmtMB(mp4Size)}`);
  console.log(`  hero.webm             -> ${fmtMB(webmSize)}`);
  console.log(`  hero-poster.webp      -> ${fmtKB(posterSize)}`);
  console.log(`  hero-poster-blur.webp -> ${fmtKB(posterBlurSize)} (mobile bg)`);
  console.log(`[hero] in ${fmtMB(inputSize)} -> out ${fmtMB(mp4Size + webmSize + posterSize)} (${((1 - (mp4Size + webmSize + posterSize) / inputSize) * 100).toFixed(0)}% smaller)`);
}

async function buildFavicons() {
  console.log('\n[favicons] generating...');
  const PUBLIC = join(ROOT, 'public');
  const outs = [
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 32,  name: 'favicon.ico' }, // PNG payload renamed to .ico — modern browsers accept it
  ];
  for (const o of outs) {
    const out = join(PUBLIC, o.name);
    await sharp(SRC_LOGO)
      .resize({ width: o.size, height: o.size, fit: 'contain', background: { r: 245, g: 230, b: 205, alpha: 1 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
    const s = await size(out);
    console.log(`  ${o.name.padEnd(22)} -> ${fmtKB(s)}`);
  }
}

async function buildOgImage() {
  console.log('\n[og-image] composing...');
  const poster = join(OUT, 'hero-poster.webp');
  const logo = join(OUT, 'logo-640.webp');
  if (!existsSync(poster) || !existsSync(logo)) {
    console.warn('  skipping (poster or logo missing)');
    return;
  }

  // 1200x630 OG: poster as bg + dark overlay + logo centered
  const W = 1200, H = 630;
  const bg = await sharp(poster)
    .resize({ width: W, height: H, fit: 'cover', position: 'center' })
    .toBuffer();

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="black" opacity="0.45"/>
    </svg>`
  );

  const logoBuf = await sharp(logo).resize({ width: 380 }).toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();

  const outFile = join(OUT, 'og-image.jpg');
  await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoBuf, top: Math.round((H - (logoMeta.height ?? 380)) / 2), left: Math.round((W - 380) / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outFile);

  const s = await size(outFile);
  console.log(`  og-image.jpg     -> ${fmtKB(s)}`);
}

async function main() {
  console.log('Paraíso Motel — Asset optimizer');
  console.log('================================');
  await ensureOut();

  if (!existsSync(SRC_LOGO)) {
    console.error(`Missing source: ${SRC_LOGO}`);
    process.exit(1);
  }
  if (!existsSync(SRC_VIDEO)) {
    console.error(`Missing source: ${SRC_VIDEO}`);
    process.exit(1);
  }

  await processLogo();
  await processVideo();
  await buildFavicons();
  await buildOgImage();

  console.log('\nDone. Output: public/media/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
