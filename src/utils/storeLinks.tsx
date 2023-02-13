export type StoreLinkType = {
  text: string;
  href: string;
  categories: { text: string; href: string }[];
};

export const storeLinks: StoreLinkType[] = [
  {
    text: 'men',
    href: '/men',
    categories: [
      {
        text: 'trainers',
        href: '/men/trainers',
      },
      {
        text: 'boots',
        href: '/men/boots',
      },
      {
        text: 'shoes',
        href: '/men/shoes',
      },
      {
        text: 'loafers',
        href: '/men/loafers',
      },
      {
        text: 'sandals',
        href: '/men/sandals',
      },
    ],
  },
  {
    text: 'women',
    href: '/men',
    categories: [
      {
        text: 'trainers',
        href: '/men/trainers',
      },
      {
        text: 'boots',
        href: '/men/boots',
      },
      {
        text: 'heels',
        href: '/men/heels',
      },
      {
        text: 'loafers',
        href: '/men/loafers',
      },
      {
        text: 'sandals',
        href: '/men/sandals',
      },
    ],
  },
];
