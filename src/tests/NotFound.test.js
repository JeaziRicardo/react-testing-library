import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Testa se a página mostra uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', src);
  });
});
