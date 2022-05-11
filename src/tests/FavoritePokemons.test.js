import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se a mensagem No favorite pokemon found, caso não tenha pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const mensage = screen.getByText('No favorite pokemon found');
    expect(mensage).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const checked = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checked).toBeInTheDocument();
    userEvent.click(checked);

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});
