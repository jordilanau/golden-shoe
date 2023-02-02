import { render, screen } from '@testing-library/react';
import Hello from '../../components/Hello';

describe('Hello', () => {
  it('should render the Hello component', () => {
    render(<Hello />);
    const element = screen.getByText(/hello world/i);
    expect(element).toBeInTheDocument();
  });
});
