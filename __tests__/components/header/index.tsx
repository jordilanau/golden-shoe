import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/header';

describe('Header', () => {
  it('renders the navbar', () => {
    render(<Header />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
