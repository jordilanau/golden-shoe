import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';

export type TopLinksType = {
  icon: React.ReactNode;
  href: string;
};

export const topLinks: TopLinksType[] = [
  {
    icon: <AiOutlineShoppingCart />,
    href: '/checkout',
  },
  {
    icon: <AiOutlineUser />,
    href: '/signup',
  },
];
