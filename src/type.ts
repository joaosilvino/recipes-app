export type UserInfoType = {
  email: string;
  password: string;
};

export type FetchType = {
  radioSelected: 'ingredient' | 'name' | 'firstLetter' | string;
  search: string,
};

export type MealType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [strIngredient: string]: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  dateModified: string;
};

export type MealsResponse = {
  meals: MealType[];
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null | string;
  strDrinkES: null | string;
  strDrinkDE: null | string;
  strDrinkFR: null | string;
  strDrinkZH_HANS: null | string;
  strDrinkZH_HANT: null | string;
  strTags: null | string;
  strVideo: null | string;
  strCategory: string;
  strIBA: null | string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: null | string;
  strInstructionsDE: null | string;
  strInstructionsFR: null | string;
  strInstructionsZH_HANS: null | string;
  strInstructionsZH_HANT: null | string;
  strDrinkThumb: string;
  [strIngredient: string]: null | string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: null | string;
  strIngredient6: null | string;
  strIngredient7: null | string;
  strIngredient8: null | string;
  strIngredient9: null | string;
  strIngredient10: null | string;
  strIngredient11: null | string;
  strIngredient12: null | string;
  strIngredient13: null | string;
  strIngredient14: null | string;
  strIngredient15: null | string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: null | string;
  strMeasure6: null | string;
  strMeasure7: null | string;
  strMeasure8: null | string;
  strMeasure9: null | string;
  strMeasure10: null | string;
  strMeasure11: null | string;
  strMeasure12: null | string;
  strMeasure13: null | string;
  strMeasure14: null | string;
  strMeasure15: null | string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type DrinksResponse = {
  drinks: DrinkType[];
};

export type InProgressRecipeType = {
  drinks: {
    [key: string]: string[];
  };
  meals: {
    [key: string]: string[];
  };
};

export type DoneRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[]
};

export type FavoriteRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};
