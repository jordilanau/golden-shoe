import { render, screen, within } from '@testing-library/react';
import Navbar from '../../../src/components/nav';
import { StoreLinkType } from '../../../src/utils/storeLinks';

describe('Navbar', () => {
  const storeLinks: StoreLinkType[] = [
    {
      text: 'men',
      href: '/men',
      categories: [],
    },
    {
      text: 'women',
      href: '/men',
      categories: [],
    },
  ];

  it('the renders navigation for large and small screens', () => {
    render(<Navbar storeLinks={storeLinks} />);
    const navigation = screen.getAllByRole('navigation');
    expect(navigation).toHaveLength(2);
  });

  it('the large screen nav renders links passed as a prop', () => {
    render(<Navbar storeLinks={storeLinks} />);
    const navigation = screen.getByTestId('large-screen-nav');
    const listElements = within(navigation).getAllByRole('listitem');
    expect(listElements).toHaveLength(storeLinks.length);
  });

  it('the small screen nav renders links passed as a prop', () => {
    render(<Navbar storeLinks={storeLinks} />);
    const navigation = screen.getByTestId('small-screen-nav');
    const listElements = within(navigation).getAllByRole('listitem');
    expect(listElements).toHaveLength(storeLinks.length);
  });
});
