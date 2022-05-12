import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);
    const pokémonName = screen.getByText('Pikachu');
    expect(pokémonName).toBeInTheDocument();

    const pokémonType = screen.getAllByText('Electric');
    expect(pokémonType[0]).toBeInTheDocument();

    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();

    const pokémonImage = screen.getByRole('img');
    expect(pokémonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokémonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa o link More Details no card do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const titleDetails = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(titleDetails).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
