import { createContext } from 'react';
import { DrinkType, FetchType } from '../../type';

export type DrinkContextType = {
  drinksData: DrinkType[] | null;
  fetchDataDrinks: (drinks: FetchType) => void;
};

const DrinksContext = createContext({} as DrinkContextType);

export default DrinksContext;
