import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const titleDetails = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(titleDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const titleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(titleSummary).toBeInTheDocument();

    const summary = screen.getByText(/this intelligent Pokémon roasts hard/i);
    expect(summary).toBeInTheDocument();
  });
});
