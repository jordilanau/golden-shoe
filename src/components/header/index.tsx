import { storeLinks } from '../../utils/storeLinks';
import Navbar from '../nav';

function Header() {
  return (
    <header>
      <Navbar storeLinks={storeLinks} />
    </header>
  );
}

export default Header;
