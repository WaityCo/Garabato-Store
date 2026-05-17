// Mock product catalog for Garabato.
// Real photos: /public/products/basicas/{blanca,crema,negra,verde}/{slug}-N.jpg

const placeholderImage = (seed, tone = 'dark', i = 1) => ({
  src: `https://picsum.photos/seed/${seed}-${i}/1200/1500`,
  alt: `${seed} ${i}`,
});

export const COLORS = {
  black:  { name: 'Negro',   hex: '#0b0b0b' },
  white:  { name: 'Blanco',  hex: '#f3f3f3' },
  cream:  { name: 'Crema',   hex: '#e8dccb' },
  green:  { name: 'Verde',   hex: '#3a4a3a' },
  acid:   { name: 'Ácido',   hex: '#e7ff3f' },
  red:    { name: 'Rojo',    hex: '#d64242' },
  gray:   { name: 'Gris',    hex: '#6a6a6a' },
  navy:   { name: 'Marino',  hex: '#1a2238' },
  brown:  { name: 'Tierra',  hex: '#5a3d2b' },
};

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const basicasImages = (color, count) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/products/basicas/${color}/${color}-${i + 1}.jpg`,
    alt: `Básica Garabato ${color}`,
  }));

export const products = [
  // 1 — Real product with 4 photographed color variants
  {
    id: 'p-basicas-garabato',
    slug: 'basica-garabato',
    name: 'Camiseta Básica Garabato',
    category: 'tees',
    collection: 'basicas',
    price: 89000,
    compareAtPrice: null,
    colors: ['cream', 'white', 'green', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['nuevo'],
    description:
      'Camiseta básica de algodón pesado, corte boxy y caída limpia. Tacto suave, costuras reforzadas. La pieza ancla del armario Garabato.',
    details: [
      '100% algodón peinado',
      'Gramaje 240 gsm',
      'Cuello reforzado en ribb',
      'Costura doble en hombros y bajo',
      'Hecha en Colombia',
    ],
    images: [
      ...basicasImages('crema', 10),
      ...basicasImages('blanca', 5),
      ...basicasImages('verde', 7),
      ...basicasImages('negra', 7),
    ],
    variantImages: {
      cream:  basicasImages('crema', 10),
      white:  basicasImages('blanca', 5),
      green:  basicasImages('verde', 7),
      black:  basicasImages('negra', 7),
    },
    lookImages: [
      { src: '/products/basicas/crema/crema-3.jpg', alt: 'Lookbook Crema' },
      { src: '/products/basicas/verde/verde-2.jpg', alt: 'Lookbook Verde' },
    ],
    relatedIds: ['p-claw-tee', 'p-frame-tee', 'p-acid-tee', 'p-static-jersey'],
    featured: true,
    stock: 120,
  },

  // 2..16 — mock products (placeholders, ready to swap when real photos come)
  {
    id: 'p-claw-tee', slug: 'claw-tee', name: 'Camiseta Claw',
    category: 'tees', collection: 'origen', price: 145000, compareAtPrice: null,
    colors: ['black', 'cream'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['drop'],
    description: 'Print serigráfico de garra trazada a mano. Algodón pesado, boxy fit.',
    details: ['100% algodón', 'Gramaje 220 gsm', 'Print serigrafía agua', 'Lavar al revés'],
    images: [placeholderImage('claw', 'd', 1), placeholderImage('claw', 'd', 2), placeholderImage('claw', 'd', 3), placeholderImage('claw', 'd', 4)],
    relatedIds: ['p-basicas-garabato', 'p-frame-tee'], featured: true, stock: 60,
  },
  {
    id: 'p-wire-hoodie', slug: 'wire-hoodie', name: 'Hoodie Wire',
    category: 'hoodies', collection: 'origen', price: 285000, compareAtPrice: 320000,
    colors: ['black', 'gray'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['back in stock'],
    description: 'Hoodie oversize con bordado de alambre. Felpa francesa pesada.',
    details: ['Mezcla 80/20', 'Forro cepillado', 'Cordones tubulares', 'Bolsillo canguro'],
    images: [placeholderImage('wire', 'd', 1), placeholderImage('wire', 'd', 2), placeholderImage('wire', 'd', 3), placeholderImage('wire', 'd', 4)],
    relatedIds: ['p-blur-hoodie', 'p-scratch-zip'], featured: true, stock: 28,
  },
  {
    id: 'p-outline-pants', slug: 'outline-pants', name: 'Outline Pants',
    category: 'pants', collection: 'taller', price: 245000, compareAtPrice: null,
    colors: ['black', 'cream', 'brown'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Pantalón cargo de tiro medio. Estampado outline en pierna derecha.',
    details: ['Algodón ripstop', 'Tiro medio, pierna recta', 'Bolsillos cargo cierre velcro'],
    images: [placeholderImage('outline', 'd', 1), placeholderImage('outline', 'd', 2), placeholderImage('outline', 'd', 3)],
    relatedIds: ['p-loop-cargo', 'p-core-denim'], featured: true, stock: 40,
  },
  {
    id: 'p-noise-cap', slug: 'noise-cap', name: 'Noise Cap',
    category: 'accessories', collection: 'archive', price: 75000, compareAtPrice: null,
    colors: ['black', 'cream', 'acid'], sizes: ['ÚNICA'],
    badges: ['drop'],
    description: 'Gorra 6 paneles, visera plana. Bordado de ruido Garabato.',
    details: ['Algodón twill', 'Cierre snapback', 'Visera plana'],
    images: [placeholderImage('noise', 'd', 1), placeholderImage('noise', 'd', 2)],
    relatedIds: ['p-mark-knit', 'p-acid-tee'], featured: false, stock: 100,
  },
  {
    id: 'p-scratch-zip', slug: 'scratch-zip', name: 'Scratch Zip',
    category: 'hoodies', collection: 'raz-mental', price: 305000, compareAtPrice: null,
    colors: ['black', 'navy'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['edición limitada'],
    description: 'Chaqueta con cierre completo, capucha forrada, print rasgado.',
    details: ['Felpa pesada', 'Cierre YKK', 'Forro de capucha'],
    images: [placeholderImage('scratch', 'd', 1), placeholderImage('scratch', 'd', 2), placeholderImage('scratch', 'd', 3)],
    relatedIds: ['p-wire-hoodie', 'p-blur-hoodie'], featured: true, stock: 18,
  },
  {
    id: 'p-frame-tee', slug: 'frame-tee', name: 'Frame Tee',
    category: 'tees', collection: 'origen', price: 135000, compareAtPrice: null,
    colors: ['white', 'cream'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Print de marco editorial pequeño en el pecho. Corte regular.',
    details: ['100% algodón', 'Print plastisol fino', 'Etiqueta tejida'],
    images: [placeholderImage('frame', 'd', 1), placeholderImage('frame', 'd', 2), placeholderImage('frame', 'd', 3)],
    relatedIds: ['p-basicas-garabato', 'p-claw-tee'], featured: false, stock: 75,
  },
  {
    id: 'p-static-jersey', slug: 'static-jersey', name: 'Static Jersey',
    category: 'tees', collection: 'raz-mental', price: 175000, compareAtPrice: null,
    colors: ['black', 'red'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['drop'],
    description: 'Camiseta tipo jersey de fútbol. Print de estática gráfica.',
    details: ['Mesh poliéster reciclado', 'Tech fit', 'Print sublimado'],
    images: [placeholderImage('static', 'd', 1), placeholderImage('static', 'd', 2), placeholderImage('static', 'd', 3)],
    relatedIds: ['p-claw-tee', 'p-acid-tee'], featured: true, stock: 32,
  },
  {
    id: 'p-core-denim', slug: 'core-denim', name: 'Core Denim',
    category: 'pants', collection: 'taller', price: 295000, compareAtPrice: null,
    colors: ['navy', 'black'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Jean de tiro alto, pierna semi-ancha. Denim japonés.',
    details: ['Denim 14oz', 'Cinco bolsillos', 'Botones contraste'],
    images: [placeholderImage('denim', 'd', 1), placeholderImage('denim', 'd', 2), placeholderImage('denim', 'd', 3)],
    relatedIds: ['p-outline-pants', 'p-loop-cargo'], featured: false, stock: 45,
  },
  {
    id: 'p-blur-hoodie', slug: 'blur-hoodie', name: 'Blur Hoodie',
    category: 'hoodies', collection: 'raz-mental', price: 275000, compareAtPrice: null,
    colors: ['gray', 'black'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Hoodie con efecto desenfoque en print posterior.',
    details: ['Felpa cepillada', 'Cuello redondo con ribb', 'Bordado mínimo en pecho'],
    images: [placeholderImage('blur', 'd', 1), placeholderImage('blur', 'd', 2), placeholderImage('blur', 'd', 3)],
    relatedIds: ['p-wire-hoodie', 'p-scratch-zip'], featured: false, stock: 38,
  },
  {
    id: 'p-acid-tee', slug: 'acid-tee', name: 'Acid Tee',
    category: 'tees', collection: 'archive', price: 145000, compareAtPrice: null,
    colors: ['acid', 'white'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['drop'],
    description: 'Camiseta acid yellow con logo en relieve. Pieza statement.',
    details: ['Algodón 220 gsm', 'Print 3D foam', 'Etiqueta tejida'],
    images: [placeholderImage('acid', 'd', 1), placeholderImage('acid', 'd', 2), placeholderImage('acid', 'd', 3)],
    relatedIds: ['p-static-jersey', 'p-noise-cap'], featured: true, stock: 25,
  },
  {
    id: 'p-loop-cargo', slug: 'loop-cargo', name: 'Loop Cargo',
    category: 'pants', collection: 'taller', price: 265000, compareAtPrice: null,
    colors: ['cream', 'brown'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Cargo de gabardina pesada con bolsillos múltiples y bucles.',
    details: ['Gabardina algodón', 'Cintura ajustable', 'Bolsillos tipo military'],
    images: [placeholderImage('loop', 'd', 1), placeholderImage('loop', 'd', 2), placeholderImage('loop', 'd', 3)],
    relatedIds: ['p-outline-pants', 'p-core-denim'], featured: false, stock: 30,
  },
  {
    id: 'p-mark-knit', slug: 'mark-knit', name: 'Mark Knit',
    category: 'tops', collection: 'archive', price: 245000, compareAtPrice: null,
    colors: ['cream', 'navy'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['back in stock'],
    description: 'Suéter de punto medio con logo Garabato tejido en costado.',
    details: ['Mezcla algodón/acrílico', 'Cuello redondo', 'Tejido jacquard'],
    images: [placeholderImage('knit', 'd', 1), placeholderImage('knit', 'd', 2), placeholderImage('knit', 'd', 3)],
    relatedIds: ['p-blur-hoodie', 'p-wire-hoodie'], featured: false, stock: 22,
  },
  {
    id: 'p-tote-mark', slug: 'tote-mark', name: 'Tote Mark',
    category: 'accessories', collection: 'archive', price: 65000, compareAtPrice: null,
    colors: ['cream', 'black'], sizes: ['ÚNICA'],
    badges: [],
    description: 'Tote bag de lona pesada con print Garabato.',
    details: ['Lona 12oz', 'Asas reforzadas', 'Bolsillo interior'],
    images: [placeholderImage('tote', 'd', 1), placeholderImage('tote', 'd', 2)],
    relatedIds: ['p-noise-cap'], featured: false, stock: 80,
  },
  {
    id: 'p-shadow-shorts', slug: 'shadow-shorts', name: 'Shadow Shorts',
    category: 'pants', collection: 'origen', price: 165000, compareAtPrice: null,
    colors: ['black', 'cream'], sizes: ['S', 'M', 'L', 'XL'],
    badges: [],
    description: 'Bermuda de algodón con caída editorial. Bolsillo trasero parche.',
    details: ['Algodón pesado', 'Pretina elástica', 'Long fit por debajo de rodilla'],
    images: [placeholderImage('shorts', 'd', 1), placeholderImage('shorts', 'd', 2), placeholderImage('shorts', 'd', 3)],
    relatedIds: ['p-core-denim', 'p-loop-cargo'], featured: false, stock: 50,
  },
  {
    id: 'p-print-longsleeve', slug: 'print-longsleeve', name: 'Print Longsleeve',
    category: 'tees', collection: 'raz-mental', price: 165000, compareAtPrice: null,
    colors: ['black', 'white'], sizes: ['S', 'M', 'L', 'XL'],
    badges: ['drop'],
    description: 'Manga larga con print integral en mangas y dorso.',
    details: ['Algodón 200 gsm', 'Print plastisol', 'Boxy fit'],
    images: [placeholderImage('longsleeve', 'd', 1), placeholderImage('longsleeve', 'd', 2), placeholderImage('longsleeve', 'd', 3)],
    relatedIds: ['p-static-jersey', 'p-claw-tee'], featured: true, stock: 35,
  },
];

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
export const getProductById = (id) => products.find((p) => p.id === id);

export const getFeatured = () => products.filter((p) => p.featured);
export const getByCategory = (category) =>
  products.filter((p) => p.category === category);
export const getByCollection = (handle) =>
  products.filter((p) => p.collection === handle);

export const getRelated = (product, limit = 4) => {
  if (!product) return [];
  const explicit = (product.relatedIds || [])
    .map(getProductById)
    .filter(Boolean);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fallback = products.filter(
    (p) => p.id !== product.id && p.category === product.category && !explicit.find((e) => e.id === p.id)
  );
  return [...explicit, ...fallback].slice(0, limit);
};
