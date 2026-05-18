// Garabato product catalog.
// Real photos: /public/products/basicas/{blanca,crema,negra,verde}/{slug}-N.jpg

export const COLORS = {
  black:  { name: 'Negro',   hex: '#0b0b0b' },
  white:  { name: 'Blanco',  hex: '#f3f3f3' },
  cream:  { name: 'Crema',   hex: '#e8dccb' },
  green:  { name: 'Verde',   hex: '#3a4a3a' },
};

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const basicasImages = (color, count) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/products/basicas/${color}/${color}-${i + 1}.jpg`,
    alt: `Básica Garabato ${color}`,
  }));

export const products = [
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
    relatedIds: [],
    featured: true,
    stock: 120,
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
