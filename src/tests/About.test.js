import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading',
      { level: 2, name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const textOne = /This application simulates a Pokédex/i;
    const textTwwo = /One can filter Pokémons by type/i;
    const paragraphsOne = screen.getByText(textOne);
    const paragraphsTwo = screen.getByText(textTwwo);
    expect(paragraphsOne).toBeInTheDocument();
    expect(paragraphsTwo).toBeInTheDocument();
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', src);
  });
});
