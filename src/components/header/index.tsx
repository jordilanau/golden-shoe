import Link from 'next/link';
import { topLinks } from '../../utils/topLinks';
import Navbar from '../nav';

function Header() {
  return (
    <header data-testid="header" className="bg-base-100">
      <div className="md:container md:flex md:flex-col md:mx-auto">
        <div className="flex space-x-3 items-center justify-end md:pt-4 md:pr-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block input input-bordered input-sm input-[rgb(243 244 246)] w-full max-w-xs"
          />
          <ul className="space-x-2 hidden md:flex">
            {topLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link href={link.href} className="text-[1.5rem]">
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
