import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Testa o redirecionamento para página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa o redirecionamento para página sobre, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
});
