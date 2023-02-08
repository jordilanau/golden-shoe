import { render, screen, within } from '@testing-library/react';
import Layout from '../../../src/components/layout';

describe('Layout', () => {
  it('renders the navbar', () => {
    render(<Layout />);

    const layout = screen.getByTestId('layout-container');
    expect(within(layout).getByRole('navigation')).toBeInTheDocument();
  });

  it('renders its children', () => {
    function Child() {
      return <div>child component</div>;
    }

    render(
      <Layout>
        <Child />
      </Layout>
    );

    const layout = screen.getByTestId('layout-container');
    expect(within(layout).getByText(/child component/i)).toBeInTheDocument();
  });
});
