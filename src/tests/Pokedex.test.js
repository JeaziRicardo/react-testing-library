import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ name }) => {
      const namePokemon = screen.getByText(name);
      const btnNext = screen.getByText(/próximo/i);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(btnNext);
    });
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const quantity = screen.getAllByTestId('pokemon-name');
    const btnNext = screen.getByText(/próximo/i);
    expect(quantity).toHaveLength(1);
    userEvent.click(btnNext);
    expect(quantity).toHaveLength(1);
  });
});
