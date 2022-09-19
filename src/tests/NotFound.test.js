import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../pages';

describe('4. Teste o componente <NotFound.js />', () => {
  test(
    'Teste se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const titleNotfound = screen
        .getByRole('heading', { name: /page requested not found/i });
      expect(titleNotfound).toBeInTheDocument();
    },
  );

  test(
    'Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter(<NotFound />);
      const imgNotFound = screen.getByRole('img');
      expect(imgNotFound.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
