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

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const MAGIC_NUMBER = 7;
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];
    const btnNext = screen.getByRole('button', { name: /próximo/i });
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnsType = screen.getAllByTestId('pokemon-type-button');
    expect(btnsType).toHaveLength(MAGIC_NUMBER);
    types.forEach((type) => {
      const btnType = screen.getByRole('button', { name: type });
      expect(btnAll).toBeInTheDocument();
      expect(btnType).toBeInTheDocument();
      userEvent.click(btnType);
      const typeAndBtn = screen.getAllByText(type);
      expect(typeAndBtn).toHaveLength(2);
      userEvent.click(btnNext);
      expect(typeAndBtn).toHaveLength(2);
      expect(btnAll).toBeInTheDocument();
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
    userEvent.click(btnAll);
    expect(namePokemon).toBeInTheDocument();
  });
});
