import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testa o componente NotFound', () => {
  test('Teste: O texto "Page request not found" é exibido em uma página que não existe', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

    expect(title).toBeInTheDocument();
  });

  test('Teste: Há uma tag img na página com o src desejado', () => {
    render(<NotFound />);

    const notFoundImg = screen.getByRole('img');

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
