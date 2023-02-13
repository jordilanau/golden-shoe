import Link from 'next/link';
import { StoreLinkType } from '../../utils/storeLinks';

type Props = {
  storeLinks: StoreLinkType[];
};

function Navigation({ storeLinks }: Props) {
  return (
    <nav className="hidden md:block mx-auto" data-testid="large-screen-nav">
      <ul className="menu menu-horizontal space-x-20 capitalize">
        {storeLinks.map((link) => {
          return (
            <li className="text-gray-100 pb-0" key={link.text}>
              <Link className="py-3 min-h-fit hover:bg-base-100" href={link.href}>
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

export default Navigation;
