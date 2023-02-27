import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Testes do componente About', () => {
  test('Teste: Se a página contém um heading com o texto "About Pokédex"', () => {
    render(<About />);

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('Teste: Se a página contém uma tag img com o src desejado', () => {
    render(<About />);

    const image = screen.getByRole('img', { name: 'Pokédex' });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
