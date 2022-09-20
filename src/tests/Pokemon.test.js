import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test(
    'Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const nameOfPoke = screen.getByRole('heading', { name: /pikachu details/i });
      const averageofPoke = screen.getByText(/average weight: 6\.0 kg/i);
      const imgOfPoke = screen.getByRole('img', { name: /pikachu sprite/i });
      const typetOfPoke = screen.getByTestId('pokemon-type');
      expect(imgOfPoke.src).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(imgOfPoke.alt).toEqual('Pikachu sprite');
      expect(nameOfPoke).toBeInTheDocument();
      expect(averageofPoke).toBeInTheDocument();
      expect(typetOfPoke.innerHTML).toEqual('Electric');
    },
  );

  test(
    'Teste se o card do pokémon contém um link de navegação para exibir detalhes',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      expect(linkMoreDetail).toBeInTheDocument();
      expect(linkMoreDetail.href).toEqual('http://localhost/pokemons/25');
    },
  );

  test(
    'Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const nameOfPoke = screen.getByRole('heading', { name: /pikachu details/i });
      expect(nameOfPoke).toBeInTheDocument();
    },
  );

  test(
    'Teste se a URL exibida no navegador muda para /pokemon/<id>',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      expect(history.location.pathname).toEqual('/pokemons/25');
    },
  );

  test(
    'Teste se existe um ícone de estrela nos pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const checkboxFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      expect(checkboxFav).toBeInTheDocument();
      userEvent.click(checkboxFav);
      const imgOfStarFavorite = screen
        .getByRole('img', { name: /pikachu is marked as favorite/i });
      expect(imgOfStarFavorite).toBeInTheDocument();
      expect(imgOfStarFavorite.src).toEqual('http://localhost/star-icon.svg');
      expect(imgOfStarFavorite.alt).toEqual('Pikachu is marked as favorite');
    },
  );
});
