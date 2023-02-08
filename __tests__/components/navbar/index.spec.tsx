import { render, screen, within } from '@testing-library/react';
import Navbar from '../../../src/components/nav';
import { StoreLinkType } from '../../../src/utils/storeLinks';

describe('Navbar', () => {
  const storeLinks: StoreLinkType[] = [
    {
      text: 'men',
      href: '/men',
    },
    {
      text: 'women',
      href: '/men',
    },
  ];

  it('renders links passed as a prop', () => {
    render(<Navbar storeLinks={storeLinks} />);

    const navigation = screen.getByRole('navigation');
    const listElements = within(navigation).getAllByRole('listitem');
    expect(listElements).toHaveLength(storeLinks.length);
  });
});
