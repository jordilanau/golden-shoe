import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';

export type TopLinksType = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

export const topLinks: TopLinksType[] = [
  {
    icon: <AiOutlineShoppingCart />,
    text: 'basket',
    href: '/checkout',
  },
  {
    icon: <AiOutlineUser />,
    text: 'sign up',
    href: '/signup',
  },
];
