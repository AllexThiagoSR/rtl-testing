import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const TYPE_TESTID = 'pokemon-type';

describe('Testa o componente Pokedex', () => {
  test('Teste: Há um heading na página com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: 'Encountered Pokémon' });

    expect(title).toBeInTheDocument();
  });

  test('Teste: Exibe o próximo pokémon da lista ao apertar no botão "Próximo Pokémon"', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/ });

    data.forEach(({ name }) => {
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste: Há botões de filtros por tipo de pokémon', () => {
    renderWithRouter(<App />);

    const filtersButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: 'All' });

    filtersButtons.forEach(({ textContent }, index) => {
      expect(filtersButtons[index]).toHaveTextContent(textContent);
      expect(buttonAll).toBeInTheDocument();
    });
  });

  test('Teste: Os botões dos tipos Fire e Psychic só exibem pokémons desse tipo', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/ });

    ['Fire', 'Psychic'].forEach((buttonName) => {
      const button = screen.getByRole('button', { name: buttonName });
      userEvent.click(button);
      expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(buttonName);
      userEvent.click(nextButton);
      expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(buttonName);
    });
  });

  test('Teste: Todos os botões só exibem pokémons do seu tipo', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/ });
    const filtersButtons = screen.getAllByTestId('pokemon-type-button');

    filtersButtons.forEach((button) => {
      if (!['Fire', 'Psychic'].includes(button.textContent)) {
        userEvent.click(button);
        expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(button.textContent);
        expect(nextButton).toBeDisabled();
      }
    });
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent('Electric');
  });
});
