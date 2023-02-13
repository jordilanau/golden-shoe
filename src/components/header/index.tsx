import { storeLinks } from '../../utils/storeLinks';
import Navbar from '../nav';

function Header() {
  return (
    <header data-testid="header">
      <Navbar storeLinks={storeLinks} />
    </header>
  );
}

export default Header;
