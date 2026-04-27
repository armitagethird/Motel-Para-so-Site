# Paraíso Motel — Site

Site institucional do **Paraíso Motel** (São Luís — MA), construído com Astro 5 + Tailwind v4. HTML estático, zero dependências em runtime, otimizado para Lighthouse 95+.

## Como rodar

```bash
npm install              # uma vez
npm run optimize         # processa logo + vídeo (gera public/media/)
npm run dev              # servidor de desenvolvimento http://localhost:4321
npm run build            # build de produção em dist/
npm run preview          # preview do build
```

> O `npm run optimize` precisa rodar uma vez após `npm install` (ou sempre que a logo ou vídeo originais mudarem em `assets/`).

## Estrutura

```
paraíso site/
├── assets/                       # arquivos originais (não tocar)
├── public/                       # assets públicos servidos no domínio raiz
│   ├── media/                    # gerado por npm run optimize (gitignored)
│   ├── favicon.svg / *.ico / icon-*.png / apple-touch-icon.png
│   ├── manifest.webmanifest
│   └── robots.txt
├── scripts/
│   └── optimize-assets.mjs       # pipeline sharp + ffmpeg
└── src/
    ├── data/motel.ts             # 🔑 fonte única dos dados — edite aqui
    ├── layouts/Base.astro        # <head>, SEO, JSON-LD, fontes, favicons
    ├── components/               # seções da página
    │   ├── Header / Hero / About / Suites / SuiteCard
    │   ├── Pricing / Menu / Map / Payment / ContactCTA
    │   ├── Footer / WhatsAppFAB
    └── pages/index.astro         # composição final
```

## Como atualizar os dados (preços, cardápio, suítes…)

Tudo está em **`src/data/motel.ts`** — a fonte única da verdade. Mude o objeto exportado e o site inteiro acompanha. Os tipos pegam erros em tempo de build.

Exemplos:

```ts
// Mudar preço de uma suíte
suites: [
  { id: "simples", price2h: 45, priceOvernight: 95, /* ... */ },
]

// Adicionar item ao cardápio
menu: [
  { id: "drinks", items: [
    { name: "Heineken Long Neck", price: 14 },
    /* ... */
  ]}
]

// Mudar WhatsApp
contact: {
  whatsapp: "5598999999999",
  whatsappDisplay: "(98) 99999-9999",
}
```

## Como trocar as fotos das suítes

Os cards da seção **Suítes** usam placeholders gradiente + maçã estilizada, marcados com `data-replaceable="true"` no DOM. Quando tiver as fotos reais:

1. Adicione cada imagem em `public/media/suites/` (ex: `simples.webp`, `luxo.webp`, `super-luxo.webp`).
2. Em `src/components/SuiteCard.astro`, troque o bloco `<div data-replaceable="true">…</div>` por:

   ```astro
   <picture class="absolute inset-0">
     <source type="image/webp" srcset={`/media/suites/${suite.id}.webp`} />
     <img
       src={`/media/suites/${suite.id}.jpg`}
       alt={`Foto da ${suite.name}`}
       width="800"
       height="600"
       loading="lazy"
       decoding="async"
       class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
     />
   </picture>
   ```

3. Para gerar os tamanhos otimizados: estenda `scripts/optimize-assets.mjs` ou use `astro:assets` (image pipeline nativo do Astro).

## Como atualizar a logo ou o vídeo

1. Substitua o arquivo em `assets/` (mantenha os nomes originais ou ajuste o caminho em `scripts/optimize-assets.mjs`).
2. Rode `npm run optimize`.
3. Rode `npm run build`.

## Performance & SEO

- **Total inicial**: ~64 KB HTML + ~52 KB CSS + ~2 KB JS = **~118 KB** (uncompressed). Com brotli no host: ~30 KB.
- **Vídeo do hero**: 380 KB (MP4) ou 320 KB (WebM) — carregado depois do LCP.
- **Logo**: WebP responsivo 10/21/45 KB conforme breakpoint.
- **JSON-LD**: schema.org `LodgingBusiness` + `Motel` completo (endereço, geo, horário, amenidades, ação de reserva).
- **OG/Twitter cards**: imagem 1200×630 gerada a partir do vídeo.
- **PWA**: `manifest.webmanifest` + ícones 192/512/180.
- **Privacidade**: Google Maps embed lazy-loaded só quando o usuário chega na seção (IntersectionObserver).
- **Acessibilidade**: skip-link, foco visível, tabs do cardápio com setas/Home/End, `prefers-reduced-motion` respeitado, contraste AAA no texto principal.

## Deploy (Vercel — recomendado)

```bash
# Vercel CLI (uma vez)
npm i -g vercel
vercel
```

Ou conecte o repo no painel do Vercel — detecta Astro automaticamente. Configure o domínio `paraisomotel.com.br` e atualize `site:` em `astro.config.mjs` se mudar.

## Customização visual

- Tokens de cor / tipografia: `src/styles/global.css` no bloco `@theme`.
- Componentes Astro são todos puros HTML + classe Tailwind — fácil de editar inline.

## Validações antes de publicar

- [ ] Confirmar coordenadas exatas em `motel.ts > geo` (atualmente aproximadas para São Luís).
- [ ] Adicionar CEP ao endereço quando souber.
- [ ] Substituir fotos das suítes pelas reais.
- [ ] Testar JSON-LD em [Schema Markup Validator](https://validator.schema.org/).
- [ ] Testar Open Graph em [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- [ ] Rodar Lighthouse (DevTools, mobile, throttling 4G) — alvo ≥ 95 nas 4 categorias.
