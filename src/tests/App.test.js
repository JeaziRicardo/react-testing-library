import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const navs = [/home/i, /about/i, /favorite pokémons/i];

describe('Testa o componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto de links de navegação.', () => {
    renderWithRouter(<App />);
    navs.map((nav) => {
      const link = screen.getByRole('link', { name: nav });
      return (expect(link).toBeInTheDocument());
    });
  });
});
