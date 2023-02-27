import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente App', () => {
  test('Teste: Se independente do caminho da url os links de navegação estão dispostos na página', () => {
    const paths = ['/', '/about', '/favorites', '/notFoundPage'];
    const { history } = renderWithRouter(<App />);
    const navigationLinks = screen.getAllByRole('link');

    paths.forEach((path) => {
      act(() => {
        history.push(path);
      });

      expect(navigationLinks[0]).toHaveTextContent('Home');
      expect(navigationLinks[0]).toBeInTheDocument();

      expect(navigationLinks[1]).toHaveTextContent('About');
      expect(navigationLinks[1]).toBeInTheDocument();

      expect(navigationLinks[2]).toHaveTextContent('Favorite Pokémon');
      expect(navigationLinks[2]).toBeInTheDocument();
    });
  });

  test('Teste: Se o link About redireciona para a página de sobre a pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste: Se o link Home redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(homeLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste: Se o link Favorites redireciona para a página de pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(favoritesLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
