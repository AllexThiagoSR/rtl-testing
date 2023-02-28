import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  test('Teste: A página contém um elemento com o texto "Pikachu Details" ao entrar nos detalhos do pokémon Pikachu', () => {
    const path = '/pokemon/25';
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const linkToPokemon = screen.getByRole('link', { name: 'More details' });
    expect(linkToPokemon.href.includes('/pokemon/25')).toBe(true);
    act(() => {
      history.push(path);
    });
    expect(history.location.pathname).toBe(path);
    expect(screen.getByRole('heading', { name: 'Pikachu Details', level: 2 })).toBeInTheDocument();
    expect(linkToPokemon).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' }));
  });
});
