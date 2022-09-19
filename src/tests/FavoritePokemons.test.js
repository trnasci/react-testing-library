import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('3. Teste do componente <FavoritePokemons.js />', () => {
  test(
    'Teste se é exibida na tela a mensagem No favorite pokemon found',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const titleNofavorite = screen.getByText(/no favorite pokemon found/i);
      expect(titleNofavorite).toBeInTheDocument();
    },
  );

  test(
    'Teste se são exibidos todos os cards de pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkDetails);
      const checkFavorite = screen
        .getByRole('checkbox', { name: /pokémon favoritado\?/i });
      expect(checkFavorite).toBeInTheDocument();
      userEvent.click(checkFavorite);
      renderWithRouter(<FavoritePokemons />);
      const titleNofavorite = screen.getByRole('heading', { name: /favorite pokémons/i });
      expect(titleNofavorite).toBeInTheDocument();
    },
  );
});
