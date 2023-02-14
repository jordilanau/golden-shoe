import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { AppContext, AppProvider } from '../../src/context/appContext';

describe('AppProvider', () => {
  it('should render children', () => {
    render(
      <AppProvider>
        <div>Test Children</div>
      </AppProvider>
    );

    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('should toggle mobile navigation', async () => {
    function TestComponent() {
      const { showMobileNav, toggleNav } = useContext(AppContext);

      return (
        <div data-testid="test-element" onClick={toggleNav}>
          {showMobileNav ? 'Mobile Nav is visible' : 'Mobile Nav is hidden'}
        </div>
      );
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const user = userEvent.setup();

    const testElement = screen.getByTestId('test-element');
    expect(testElement.textContent).toBe('Mobile Nav is hidden');

    await user.click(testElement);
    expect(testElement.textContent).toBe('Mobile Nav is visible');

    await user.click(testElement);
    expect(testElement.textContent).toBe('Mobile Nav is hidden');
  });
});
