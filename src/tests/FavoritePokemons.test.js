import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se a mensagem No favorite pokemon found, caso não tenha pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const mensage = screen.getByText('No favorite pokemon found');
    expect(mensage).toBeInTheDocument();
  });
});
