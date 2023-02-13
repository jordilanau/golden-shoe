import { useState } from 'react';
import { StoreLinkType } from '../../utils/storeLinks';
import MobileNavigation from '../mobileNavigation';
import Navigation from '../navigation';

type Props = {
  storeLinks: StoreLinkType[];
};

function Navbar({ storeLinks }: Props) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  function toggleNav() {
    setShowMobileNav((oldValue) => !oldValue);
  }

  return (
    <div className="navbar bg-base-100 min-h-min">
      <div className="flex-none">
        <button className="md:hidden btn btn-square btn-ghost" onClick={toggleNav}>
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
      <MobileNavigation storeLinks={storeLinks} isVisible={showMobileNav} toggleNav={toggleNav} />
    </div>
  );
}

export default Navbar;
