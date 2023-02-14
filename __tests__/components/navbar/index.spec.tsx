import { render, screen, within } from '@testing-library/react';
import Navbar from '../../../src/components/nav';
import { AppContext, AppState } from '../../../src/context/appContext';
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

  it('adds the class w-0 when showMobileNav is false', () => {
    const initialState: AppState = {
      showMobileNav: false,
      toggleNav: jest.fn(),
    };
    render(
      <AppContext.Provider value={initialState}>
        <Navbar storeLinks={storeLinks} />
      </AppContext.Provider>
    );

    const navigation = screen.getByTestId('small-screen-nav');
    expect(navigation.classList.contains('w-0')).toBeTruthy();
    expect(navigation.classList.contains('w-72')).toBeFalsy();
  });

  it('adds the class w-72 when showMobileNav is true', () => {
    const initialState: AppState = {
      showMobileNav: true,
      toggleNav: jest.fn(),
    };
    render(
      <AppContext.Provider value={initialState}>
        <Navbar storeLinks={storeLinks} />
      </AppContext.Provider>
    );

    const navigation = screen.getByTestId('small-screen-nav');
    expect(navigation.classList.contains('w-0')).toBeFalsy();
    expect(navigation.classList.contains('w-72')).toBeTruthy();
  });
});
