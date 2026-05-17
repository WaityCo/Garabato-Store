export const collections = [
  {
    handle: 'origen',
    name: 'Origen.',
    subtitle: 'La base. Las piezas que abren el archivo.',
    description:
      'Origen reúne las prendas fundamentales del armario Garabato. Cortes limpios, gramajes pesados, prints discretos.',
    cover: '/products/basicas/crema/crema-2.jpg',
  },
  {
    handle: 'raz-mental',
    name: 'Raz Mental',
    subtitle: 'Energía gráfica, prints frontales, statement piezas.',
    description:
      'Raz Mental es la cara más expresiva del catálogo: prints grandes, colores ácidos, siluetas con presencia.',
    cover: '/products/basicas/negra/negra-3.jpg',
  },
  {
    handle: 'taller',
    name: 'Taller',
    subtitle: 'Cargos, denim, prendas de trabajo reinterpretadas.',
    description:
      'Pantalones, chaquetas y prendas de carácter utility con detalles funcionales y acabado editorial.',
    cover: '/products/basicas/verde/verde-2.jpg',
  },
  {
    handle: 'basicas',
    name: 'Básicas',
    subtitle: 'Esenciales de gramaje pesado y caída limpia.',
    description:
      'La línea esencial del armario Garabato. Tejido pesado, costuras reforzadas, paletas neutras.',
    cover: '/products/basicas/blanca/blanca-1.jpg',
  },
  {
    handle: 'archive',
    name: 'Archive',
    subtitle: 'Drops pasados, restocks limitados, piezas archivo.',
    description:
      'Piezas atemporales que vuelven cada cierto tiempo en cantidades reducidas.',
    cover: '/products/basicas/crema/crema-5.jpg',
  },
];

export const getCollection = (handle) =>
  collections.find((c) => c.handle === handle);

export const CATEGORIES = [
  { id: 'tees',        label: 'Tees' },
  { id: 'hoodies',     label: 'Hoodies' },
  { id: 'pants',       label: 'Pants' },
  { id: 'tops',        label: 'Tops' },
  { id: 'accessories', label: 'Accesorios' },
];
