import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { StoreProps } from '../../utils/storeLinks';
import MobileNavigation from '../mobileNavigation';
import Navigation from '../navigation';

function Navbar({ storeLinks }: StoreProps) {
  const { toggleNav, showMobileNav } = useContext(AppContext);

  return (
    <div className="navbar min-h-min">
      <div className="flex-none">
        <button
          className="md:hidden btn btn-square btn-ghost"
          onClick={toggleNav}
          data-testid="toggle-nav-btn"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <Navigation storeLinks={storeLinks} />
      <MobileNavigation storeLinks={storeLinks} />
    </div>
  );
}

export default Navbar;
