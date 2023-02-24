import { render, screen, within } from '@testing-library/react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../../../src/components/nav';
import { AppContext, AppState } from '../../../src/context/appContext';

jest.mock('../../../src/utils/storeLinks', () => ({
  storeLinks: [
    {
      text: 'deals',
      href: '/deals',
      categories: [],
    },
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
  ],
}));

jest.mock('../../../src/utils/topLinks.tsx', () => ({
  topLinks: [
    {
      icon: <AiOutlineShoppingCart />,
      text: 'basket',
      href: '/checkout',
    },
    {
      icon: <AiOutlineUser />,
      text: 'sign up',
      href: '/signup',
    },
  ],
}));

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('the renders navigation for large and small screens', () => {
    render(<Navbar />);
    const navigation = screen.getAllByRole('navigation');
    expect(navigation).toHaveLength(2);
  });

  it('the large screen nav renders navigation links', () => {
    render(<Navbar />);
    const navigation = screen.getByTestId('large-screen-nav');
    const listElements = within(navigation).getAllByRole('listitem');
    expect(listElements).toHaveLength(3);
  });

  it('the small screen nav renders navigation links and user links', () => {
    render(<Navbar />);
    const navigation = screen.getByTestId('small-screen-nav');
    const listElements = within(navigation).getAllByRole('listitem');
    expect(listElements).toHaveLength(5);
  });

  it('adds the class w-0 when showMobileNav is false', () => {
    const initialState: AppState = {
      showMobileNav: false,
      toggleNav: jest.fn(),
    };
    render(
      <AppContext.Provider value={initialState}>
        <Navbar />
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
        <Navbar />
      </AppContext.Provider>
    );

    const navigation = screen.getByTestId('small-screen-nav');
    expect(navigation.classList.contains('w-0')).toBeFalsy();
    expect(navigation.classList.contains('w-72')).toBeTruthy();
  });
});
