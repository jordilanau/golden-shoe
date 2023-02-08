import Link from 'next/link';
import { StoreLinkType } from '../../utils/storeLinks';

type Props = {
  storeLinks: StoreLinkType[];
};

function Navbar({ storeLinks }: Props) {
  return (
    <nav>
      <ul>
        {storeLinks.map((link) => {
          return (
            <li key={link.text}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
