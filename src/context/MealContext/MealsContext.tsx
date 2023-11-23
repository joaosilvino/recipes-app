import { createContext } from 'react';
import { FetchType, MealType } from '../../type';

export type MealsContextType = {
  mealsData: MealType[];
  fetchDataMeals: (param: FetchType) => void;
};

const MealsContext = createContext({} as MealsContextType);

export default MealsContext;
