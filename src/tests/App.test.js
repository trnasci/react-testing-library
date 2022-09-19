import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste do componente <App.js />', () => {
  test(
    'Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /home/i });
      expect(linkHome).toBeInTheDocument();

      const linkAbout = screen.getByRole('link', { name: /about/i });
      expect(linkAbout).toBeInTheDocument();

      const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(linkFavorite).toBeInTheDocument();
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página inicial ao clicar no link Home',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /home/i });
      userEvent.click(linkHome);
      const titleHome = screen.getByRole('heading', { name: /encountered pokémons/i });
      expect(titleHome).toBeInTheDocument();
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página de About ao clicar no link About',
    () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkAbout);
      const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
      expect(titleAbout).toBeInTheDocument();
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página de Pokémons Favoritados ao clica',
    () => {
      renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkFavorite);
      const titleFavorite = screen.getByRole('heading', { name: /favorite pokémons/i });
      expect(titleFavorite).toBeInTheDocument();
    },
  );

  test(
    'Teste se a aplicação é redirecionada para a página Not Found com URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/URLdesconhecida');
      });
      const titleNotfound = screen
        .getByRole('heading', { name: /page requested not found/i });
      expect(titleNotfound).toBeInTheDocument();
    },
  );
});
