export type StoreLinkType = {
  text: string;
  href: string;
  categories: { text: string; href: string; image: string }[];
};

export type StoreProps = {
  storeLinks: StoreLinkType[];
};

export const storeLinks: StoreLinkType[] = [
  {
    text: 'men',
    href: '/men',
    categories: [
      {
        text: 'trainers',
        href: '/men/trainers',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/sneakers_too9nm.jpg',
      },
      {
        text: 'boots',
        href: '/men/boots',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067752/golden-shoe/men-boots_jsdta8.jpg',
      },
      {
        text: 'shoes',
        href: '/men/shoes',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067752/golden-shoe/men-shoes_go87v9.jpg',
      },
      {
        text: 'loafers',
        href: '/men/loafers',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067753/golden-shoe/men-loafers_d4pw8w.jpg',
      },
      {
        text: 'sandals',
        href: '/men/sandals',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/men-sandals_ptq70a.jpg',
      },
    ],
  },
  {
    text: 'women',
    href: '/women',
    categories: [
      {
        text: 'trainers',
        href: '/women/trainers',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/sneakers_too9nm.jpg',
      },
      {
        text: 'boots',
        href: '/women/boots',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/women-boots_kxfnkr.jpg',
      },
      {
        text: 'heels',
        href: '/women/heels',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/women-heels_lzbqe2.jpg',
      },
      {
        text: 'loafers',
        href: '/women/loafers',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067751/golden-shoe/women-loafers_hln13a.jpg',
      },
      {
        text: 'sandals',
        href: '/women/sandals',
        image:
          'https://res.cloudinary.com/drmt1q1rs/image/upload/q_auto:good/v1677067752/golden-shoe/women-sandals_hnbb7o.jpg',
      },
    ],
  },
];
