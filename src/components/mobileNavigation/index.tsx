import Link from 'next/link';
import { useContext } from 'react';
import { CgClose } from 'react-icons/cg';
import { AppContext } from '../../context/appContext';
import { storeLinks } from '../../utils/storeLinks';

function MobileNavigation() {
  const { toggleNav, showMobileNav } = useContext(AppContext);

  return (
    <nav
      className={
        'md:hidden absolute bg-gray-100 left-0 top-0 bottom-0 flex flex-col items-start transition-width overflow-hidden ' +
        (showMobileNav ? 'w-72' : 'w-0')
      }
      data-testid="small-screen-nav"
    >
      <button className="ml-auto p-4" onClick={toggleNav}>
        <CgClose className="text-red-600" />
      </button>

      <ul className="">
        {storeLinks.map((link) => {
          return (
            <li className="text-gray-900 pb-0" key={link.text}>
              <Link className="py-3 min-h-full hover:bg-base-100" href={link.href}>
                {link.text}
              </Link>
              <ul className="pt-2 space-y-2">
                {link.categories.map((category) => {
                  return (
                    <li key={category.text}>
                      <Link className="pl-2 pr-6 py-1 text-gray-900" href={category.href}>
                        {category.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileNavigation;
