// Single source of truth for all Paraíso Motel data.
// Edit values here to update the entire site.

export const motel = {
  name: 'Paraíso Motel',
  tagline: 'Seu paraíso particular em São Luís',
  description:
    'Motel boutique no coração de São Luís com 16 suítes para todos os momentos. Conforto, privacidade e um atendimento que faz a diferença — 24 horas, todos os dias.',
  shortDescription:
    '16 suítes em São Luís — Simples, Luxo e Super Luxo. Aberto 24h. Pernoite a partir de R$ 90.',

  contact: {
    whatsapp: '5598988621245',
    whatsappDisplay: '(98) 98862-1245',
    whatsappMessage: 'Olá! Gostaria de informações sobre as suítes do Paraíso Motel.',
    phone: '+5598988621245',
    phoneDisplay: '(98) 98862-1245',
    instagram: 'paraisomotelpousada',
    instagramUrl: 'https://www.instagram.com/paraisomotelpousada/',
  },

  address: {
    street: 'Rua Celso Magalhães',
    number: '02',
    neighborhood: 'Felipinho',
    city: 'São Luís',
    state: 'MA',
    stateName: 'Maranhão',
    country: 'BR',
    full: 'Rua Celso Magalhães, 02 — Felipinho, São Luís — MA',
  },

  // Google Maps Place ID derived from the share link the owner provided.
  // Used for both embed and "directions" deep-link.
  maps: {
    placeId: '0x48adf2fcb01e7743',
    placeName: 'PARAISO Motel',
    embedQuery: 'PARAISO+Motel,+Rua+Celso+Magalhães,+São+Luís,+MA',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=PARAISO+Motel+S%C3%A3o+Lu%C3%ADs+MA&destination_place_id=ChIJ0000000000_kde',
    shareUrl:
      'https://www.google.com/maps/place/PARAISO+Motel/data=!4m2!3m1!1s0x0:0x48adf2fcb01e7743',
  },

  hours: {
    open24h: true,
    display: 'Aberto 24 horas, todos os dias',
    schemaHours: 'Mo-Su 00:00-23:59',
  },

  highlights: [
    { icon: 'suites', label: '16 suítes', detail: 'Simples, Luxo e Super Luxo' },
    { icon: 'clock', label: '24 horas', detail: 'Aberto todos os dias' },
    { icon: 'lock', label: 'Privacidade total', detail: 'Entrada e saída discretas' },
  ],

  suites: [
    {
      id: 'simples',
      name: 'Suíte Simples',
      tier: 'Essencial',
      units: 7,
      rooms: 'Quartos 10 a 16',
      features: ['Cama de casal', 'Banheiro privativo', 'Ar condicionado', 'TV', 'Frigobar'],
      price2h: 40,
      priceOvernight: 90,
      placeholderHue: 32,
    },
    {
      id: 'luxo',
      name: 'Suíte Luxo',
      tier: 'Diferenciada',
      units: 6,
      rooms: 'Quartos 1 a 6',
      features: [
        'Espelho no teto',
        'Cadeira erótica',
        'Cama de casal',
        'Banheiro privativo',
        'Ar condicionado',
        'TV',
        'Frigobar',
      ],
      price2h: 50,
      priceOvernight: 90,
      placeholderHue: 350,
    },
    {
      id: 'super-luxo',
      name: 'Suíte Super Luxo',
      tier: 'Premium',
      units: 3,
      rooms: 'Quartos 7 a 9',
      features: [
        'Sofá erótico',
        'Espelho no teto',
        'Hidromassagem (quartos 8 e 9)',
        'Pole dance (quarto 7)',
        'Ar condicionado',
        'TV',
        'Frigobar',
      ],
      price2h: 80,
      priceOvernight: 90,
      placeholderHue: 8,
    },
  ],

  rules: [
    'Adicional de R$ 15,00 passando das 02h00.',
    'Cortesia (item de brinde) válida apenas na estadia de 2 horas.',
    'Pernoite das 00h00 às 06h00 — R$ 90,00 em todas as categorias.',
  ],

  menu: [
    {
      id: 'food',
      name: 'Alimentação',
      items: [
        { name: 'Carne de Sol (farofa e vinagrete)', price: 40 },
        { name: 'Calabresa (farofa e vinagrete)', price: 25 },
        { name: 'Café da Manhã (café, leite, dois mistos e dois copos de suco)', price: 25 },
        { name: 'Misto', price: 10 },
        { name: 'Caldo de Ovos', price: 10 },
        { name: 'Batata Frita', price: 10 },
        { name: 'Batata Ondulada', price: 7 },
        { name: 'Sucos da Fruta com Leite', price: 10 },
        { name: 'Sucos Psiu', price: 6 },
        { name: 'Nescau em Caixa', price: 5 },
        { name: 'Ovos Cozidos ou Fritos', price: 3 },
      ],
    },
    {
      id: 'sweets',
      name: 'Doces & Bombons',
      items: [
        { name: 'Talentos Barra', price: 15 },
        { name: 'Kit Kat', price: 8 },
        { name: 'Trident ou Halls', price: 4 },
      ],
    },
    {
      id: 'drinks',
      name: 'Bebidas',
      items: [
        { name: 'Red Bull', price: 15 },
        { name: 'Cerveja 600ml', price: 12 },
        { name: 'Longneck', price: 12 },
        { name: 'Campari (dose)', price: 10 },
        { name: 'Whisky (dose)', price: 10 },
        { name: 'Cerveja Lata', price: 8 },
        { name: 'Ice', price: 6 },
        { name: 'Água Mineral', price: 5 },
        { name: 'Refrigerante Lata', price: 5 },
      ],
    },
    {
      id: 'extras',
      name: 'Diversos & Utilidades',
      items: [
        { name: 'Cigarro Free', price: 20 },
        { name: 'Copo', price: 10 },
        { name: 'Escova (kit)', price: 8 },
        { name: 'Touca', price: 5 },
        { name: 'Preservativo', price: 5 },
        { name: 'Creme Erótico', price: 5 },
        { name: 'Prestobarba', price: 5 },
        { name: 'Toalha / Lençol / Fronha (extra)', price: 3 },
        { name: 'Absorvente (unidade)', price: 3 },
        { name: 'Fósforo', price: 2 },
      ],
    },
  ],

  payment: {
    methods: ['PIX', 'Mastercard', 'Visa', 'Elo', 'American Express', 'Hipercard', 'Hiper', 'Diners Club'],
    terminal: 'Stone',
    note: 'Aceitamos PIX e todos os principais cartões de crédito e débito.',
  },

  notice: 'Não nos responsabilizamos por objetos esquecidos.',

  // Used for SEO / JSON-LD
  seo: {
    siteUrl: 'https://paraisomotel.com.br',
    title: 'Paraíso Motel — Conforto e Privacidade em São Luís | 16 Suítes 24h',
    description:
      'Paraíso Motel em São Luís - MA. 16 suítes (Simples, Luxo e Super Luxo) com hidromassagem, espelho no teto e privacidade total. Aberto 24 horas. Pernoite R$ 90. Reserve pelo WhatsApp.',
    keywords: [
      'motel são luís',
      'motel maranhão',
      'paraíso motel',
      'motel 24 horas são luís',
      'suíte com hidromassagem são luís',
      'motel felipinho',
    ],
    ogImage: '/media/og-image.jpg',
    twitterImage: '/media/og-image.jpg',
    locale: 'pt_BR',
    themeColor: '#0A0A0A',
    backgroundColor: '#F5E6CD',
  },

  // Approximate coordinates for São Luís - MA. Refine when you have the exact lat/lng.
  geo: {
    lat: -2.5391,
    lng: -44.2829,
    region: 'BR-MA',
    placename: 'São Luís',
    icbm: '-2.5391, -44.2829',
  },
} as const;

export type Motel = typeof motel;
export type Suite = (typeof motel.suites)[number];
export type MenuGroup = (typeof motel.menu)[number];
export type MenuItem = MenuGroup['items'][number];

export const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

export const whatsappLink = (message?: string): string => {
  const text = encodeURIComponent(message ?? motel.contact.whatsappMessage);
  return `https://wa.me/${motel.contact.whatsapp}?text=${text}`;
};
