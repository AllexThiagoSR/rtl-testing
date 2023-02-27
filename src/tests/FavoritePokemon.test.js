import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testes do componente FavoritePokemon', () => {
  test('Teste: É exibida a mensagem "No favorite Pokémon found" se não houver nenhum pokemon favoritado', () => {
    render(<FavoritePokemon />);
    const noFavoriteMessage = screen.getByText(/no favorite pokémon found/i);

    expect(noFavoriteMessage).toBeInTheDocument();
  });

  test('Teste: São exibidos apenas os pokémons favoritados', () => {
    localStorage.setItem('favoritePokemonIds', '[25, 4]');

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorites');
    });

    const favorites = screen.getAllByTestId('pokemon-name');
    const favoritesPokemonsName = ['Pikachu', 'Charmander'];
    expect(favorites).toHaveLength(2);
    favoritesPokemonsName.forEach((name, index) => {
      expect(favorites[index]).toHaveTextContent(name);
    });
  });
});
