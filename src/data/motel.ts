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
    neighborhood: 'Filipinho',
    city: 'São Luís',
    state: 'MA',
    stateName: 'Maranhão',
    country: 'BR',
    postalCode: '65041-820',
    full: 'Rua Celso Magalhães, 02 — Filipinho, São Luís — MA, 65041-820',
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
      description:
        'O essencial, muito bem feito. As 7 suítes da categoria Simples ocupam os quartos 10 a 16 e trazem tudo que você precisa para um bom momento: cama de casal espaçosa, banheiro privativo, ar condicionado, TV e frigobar. Funcional, confortável e direto ao ponto.',
      highlights: [
        '7 unidades disponíveis',
        'Cama de casal espaçosa',
        'Banheiro privativo, ar e TV',
      ],
      photoCount: 4,
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
      description:
        'Os detalhes certos para mudar a noite. As 6 suítes Luxo (quartos 1 a 6) chegam com espelho no teto e cadeira erótica, somando-se a toda a estrutura essencial. Para casais que querem um clima especial sem abrir mão do conforto.',
      highlights: [
        'Espelho no teto',
        'Cadeira erótica',
        'Estrutura completa',
      ],
      photoCount: 4,
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
      description:
        'O pacote completo. São apenas 3 unidades, cada uma com sua personalidade: o quarto 7 vem com pole dance, sofá erótico e espelho no teto; os quartos 8 e 9 trazem banheira de hidromassagem além de todos os diferenciais. Para fazer da estadia um evento.',
      highlights: [
        'Hidromassagem nos quartos 8 e 9',
        'Pole dance no quarto 7',
        'Sofá erótico e espelho no teto',
      ],
      photoCount: 4,
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
    // Title front-loads the primary local query "Motel em São Luís".
    // Length kept under ~62 chars so Google doesn't truncate.
    title: 'Motel em São Luís - MA | Paraíso Motel — 24h, Hidromassagem',
    // Description leads with the high-intent local query and packs the
    // amenities people actually search for, plus a clear price anchor.
    description:
      'Motel em São Luís - MA. Paraíso Motel: 16 suítes 24h, hidromassagem, espelho no teto e sofá erótico. Pernoite R$ 90. Reserve agora pelo WhatsApp.',
    // Keyword set covers brand + local intent + feature intent + variants.
    // Ordered by descending search-volume guess.
    keywords: [
      'motel são luís',
      'motel em são luís',
      'motel são luís ma',
      'motel são luís maranhão',
      'paraíso motel',
      'paraíso motel são luís',
      'motel 24 horas são luís',
      'motel barato são luís',
      'motel com hidromassagem são luís',
      'motel filipinho',
      'motel com pole dance são luís',
      'pernoite motel são luís',
      'motéis são luís',
      'motel ma',
      'motel maranhão',
    ],
    ogImage: '/media/og-image.jpg',
    twitterImage: '/media/og-image.jpg',
    locale: 'pt_BR',
    themeColor: '#0A0A0A',
    backgroundColor: '#F5E6CD',
    slogan: 'Seu paraíso particular em São Luís',
  },

  // Frequently asked questions — rendered as a visible accordion AND
  // emitted as FAQPage JSON-LD. Each Q/A repeats target keywords
  // naturally for both readers and search engines.
  faqs: [
    {
      q: 'Onde fica o Paraíso Motel em São Luís?',
      a: 'O Paraíso Motel fica em São Luís - MA, no bairro Filipinho, na Rua Celso Magalhães, 02, CEP 65041-820. Atendemos toda a Grande São Luís com fácil acesso.',
    },
    {
      q: 'O Paraíso Motel funciona 24 horas?',
      a: 'Sim. O Paraíso Motel funciona 24 horas, todos os dias da semana. Você pode chegar a qualquer hora do dia ou da noite.',
    },
    {
      q: 'Quanto custa o pernoite no Paraíso Motel?',
      a: 'O pernoite (das 00h00 às 06h00) custa R$ 90,00 em todas as categorias de suíte. A estadia de 2 horas começa em R$ 40,00 na Suíte Simples.',
    },
    {
      q: 'Quais formas de pagamento o Paraíso Motel aceita?',
      a: 'Aceitamos PIX, Mastercard, Visa, Elo, American Express, Hipercard, Hiper e Diners Club. Operamos com maquininha Stone.',
    },
    {
      q: 'O motel tem suíte com hidromassagem em São Luís?',
      a: 'Sim. As suítes Super Luxo (quartos 8 e 9) do Paraíso Motel têm banheira de hidromassagem, espelho no teto e sofá erótico. O quarto 7 traz pole dance.',
    },
    {
      q: 'Quantas suítes o Paraíso Motel tem?',
      a: 'São 16 suítes no total, divididas em três categorias: 7 Simples (quartos 10 a 16), 6 Luxo (1 a 6) com espelho no teto e cadeira erótica, e 3 Super Luxo (7 a 9).',
    },
    {
      q: 'Como reservar uma suíte no Paraíso Motel?',
      a: 'Mande uma mensagem no WhatsApp (98) 98862-1245 e te respondemos em segundos com as suítes disponíveis. Sem cadastro, sem complicação.',
    },
  ],

  // Exact coordinates extracted from Google Maps for the building entrance.
  geo: {
    lat: -2.5562859,
    lng: -44.2663847,
    region: 'BR-MA',
    placename: 'São Luís',
    icbm: '-2.5562859, -44.2663847',
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
