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

  test('Testa se existe uma seção contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const titleLocations = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(titleLocations).toBeInTheDocument();

    const imageLocations = screen.getAllByRole('img');
    expect(imageLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocations[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imageLocations[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(imageLocations[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    const checkLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkLabel).toBeInTheDocument();
  });
});
