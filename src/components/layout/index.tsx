import { FC, ReactNode } from 'react';
import Header from '../header';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" data-testid="layout-container">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
