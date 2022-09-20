import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test(
    'Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const titlePokedex = screen.getByRole('heading', { name: /encountered pokémons/i });
      expect(titlePokedex).toBeInTheDocument();
    },
  );

  test(
    'Teste se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);
      const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNextPoke).toBeInTheDocument();
      const imgPokeBefore = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(imgPokeBefore).toBeInTheDocument();
      userEvent.click(btnNextPoke);
      const imgPokeafter = screen.getByRole('img');
      expect(imgPokeafter.src).toEqual(imgPokeBefore.src);
    },
  );

  test(
    'Teste se a Pokédex tem os botões de filtro',
    () => {
      renderWithRouter(<App />);
      const btnPokeFilter = screen.getAllByTestId('pokemon-type-button');
      const numberOfBtnFilters = 7;
      expect(btnPokeFilter.length).toEqual(numberOfBtnFilters);
      const btnEletric = screen.getByRole('button', { name: /electric/i });
      expect(btnEletric).toBeInTheDocument();
      const btnFire = screen.getByRole('button', { name: /fire/i });
      expect(btnFire).toBeInTheDocument();
      const btnBug = screen.getByRole('button', { name: /bug/i });
      expect(btnBug).toBeInTheDocument();
      const btnPoison = screen.getByRole('button', { name: /poison/i });
      expect(btnPoison).toBeInTheDocument();
      const btnPsychic = screen.getByRole('button', { name: /psychic/i });
      expect(btnPsychic).toBeInTheDocument();
      const btnNormal = screen.getByRole('button', { name: /normal/i });
      expect(btnNormal).toBeInTheDocument();
      const btnDragon = screen.getByRole('button', { name: /dragon/i });
      expect(btnDragon).toBeInTheDocument();
      const btnAll = screen.getByRole('button', { name: /all/i });
      expect(btnAll).toBeInTheDocument();
    },
  );

  test(
    'Teste se a Pokédex contém um botão para resetar o filtro',
    () => {
      renderWithRouter(<App />);
      const titleInitial = screen.getByText(/pikachu/i);
      expect(titleInitial).toBeInTheDocument();
      const btnAll = screen.getByRole('button', { name: /all/i });
      expect(btnAll).toBeInTheDocument();
      userEvent.click(btnAll);
      expect(titleInitial).toBeInTheDocument();
    },
  );
});
