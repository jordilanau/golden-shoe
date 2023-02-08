import { BiUserCircle } from 'react-icons/bi';

export type TopLinksType = {
  icon: React.ReactNode;
  href: string;
};

export const topLinks: TopLinksType[] = [
  {
    icon: <BiUserCircle />,
    href: '/signup',
  },
];
