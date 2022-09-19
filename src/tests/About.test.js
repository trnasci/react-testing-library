import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../pages';

describe('2. Teste o componente <About.js />', () => {
  test(
    'Teste se a página contém as informações sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
      expect(titleAbout).toBeInTheDocument();
    },
  );

  test(
    'Teste se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const firstP = screen.getByText(
        /this application simulates a pokédex, a digital encyclopedia containing all/i,
      );
      expect(firstP).toBeInTheDocument();
      const secondP = screen.getByText(
        /One can filter Pokémons by type/i,
      );
      expect(secondP).toBeInTheDocument();
    },
  );

  test(
    'Teste se a página contém a seguinte imagem de uma Pokédex',
    () => {
      renderWithRouter(<About />);
      const imgPokedex = screen.getByRole('img');
      expect(imgPokedex.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    },
  );
});
