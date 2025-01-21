import ProductsPage from '@/routes/Products/ProductPage';
import { renderWithProviders } from '@/shared/store/test';
import { screen, waitFor } from '@testing-library/react';

describe('ProductsPage', () => {
  test('Should load page title', () => {
    renderWithProviders(<ProductsPage />);
    const text = screen.getByText(/subscriptions/i);
    expect(text).toBeInTheDocument();
  });
  
  test('Should load subscriptions', async () => {
    renderWithProviders(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId('subscription-item').length).toBe(3);
    });
  });
});
