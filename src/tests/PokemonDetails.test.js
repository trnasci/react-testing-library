import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('7. Teste do componente <PokemonDetails.js />', () => {
  test(
    'Teste se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const nameOfPoke = screen.getByRole('heading', { name: /pikachu details/i });
      expect(nameOfPoke).toBeInTheDocument();
      expect(linkMoreDetail).not.toBeInTheDocument();
      const sumaryTitle = screen.getByRole('heading', { name: /summary/i });
      expect(sumaryTitle).toBeInTheDocument();
      const detailsOfPoke = screen
        .getByText(/hard berries with electricity to make them tender enough to eat\./i);
      expect(detailsOfPoke).toBeInTheDocument();
    },
  );

  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do pokém',
    () => {
      renderWithRouter(<App />);
      const btnFirePokes = screen.getByRole('button', { name: /fire/i });
      userEvent.click(btnFirePokes);
      const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPoke);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const locationTitle = screen
        .getByRole('heading', { name: /game locations of rapidash/i });
      expect(locationTitle).toBeInTheDocument();
      const imgLocation = screen.getAllByAltText(/Rapidash location/i);
      expect(imgLocation.length).toEqual(2);
      expect(imgLocation[0].src).toEqual('https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png');
      expect(imgLocation[1].src).toEqual('https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png');
    },
  );

  test(
    'Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);
      const btnFirePokes = screen.getByRole('button', { name: /fire/i });
      userEvent.click(btnFirePokes);
      const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPoke);
      const linkMoreDetail = screen.getByRole('link', { name: /more details/i });
      userEvent.click(linkMoreDetail);
      const btnFavoritePoke = screen
        .getByRole('checkbox', { name: /pokémon favoritado\?/i });
      userEvent.click(btnFavoritePoke);
      const starOfFavoritePoke = screen
        .getByRole('img', { name: /rapidash is marked as favorite/i });
      expect(starOfFavoritePoke).toBeInTheDocument();
      userEvent.click(btnFavoritePoke);
      expect(starOfFavoritePoke).not.toBeInTheDocument();
    },
  );
});
