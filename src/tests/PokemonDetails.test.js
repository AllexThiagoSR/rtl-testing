import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const path = '/pokemon/25';

describe('Testa o componente PokemonDetails', () => {
  test('Teste: A página contém um elemento com o texto "Pikachu Details" ao entrar nos detalhos do pokémon Pikachu', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const linkToPokemon = screen.getByRole('link', { name: 'More details' });
    expect(linkToPokemon.href.includes(path)).toBe(true);
    act(() => {
      history.push(path);
    });
    expect(history.location.pathname).toBe(path);
    expect(screen.getByRole('heading', { name: 'Pikachu Details', level: 2 })).toBeInTheDocument();
    expect(linkToPokemon).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' }));
    expect(screen.getByText(/electricity/i)).toBeInTheDocument();
  });

  test('Teste: Renderiza as informações dos mapas corretamente', () => {
    const { foundAt } = data[0];
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(path);
    });
    expect(screen.getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' })).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      const mapsImages = screen.getAllByRole('img', { name: 'Pikachu location' });
      expect(mapsImages[index]).toBeInTheDocument();
      expect(mapsImages[index]).toHaveProperty('src', map);
    });
  });

  test('Teste: É possível favoritar o pokemon pela página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(path);
    });
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    expect(screen.getByRole('img', { name: 'Pikachu is marked as favorite' })).toBeInTheDocument();
  });
});
