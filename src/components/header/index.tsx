import { storeLinks } from '../../utils/storeLinks';
import { topLinks } from '../../utils/topLinks';
import Navbar from '../nav';

function Header() {
  return (
    <header data-testid="header" className="bg-base-100">
      <div className="container flex flex-col mx-auto">
        <div className="flex space-x-3 items-center justify-end">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block input input-bordered input-[rgb(243 244 246)] w-full max-w-xs"
          />
          <ul className="flex">
            {topLinks.map((link) => {
              return <li key={link.href}>{link.icon}</li>;
            })}
          </ul>
        </div>
        <Navbar storeLinks={storeLinks} />
      </div>
    </header>
  );
}

export default Header;
