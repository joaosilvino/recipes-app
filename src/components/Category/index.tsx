import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import MealsContext from '../../context/MealContext/MealsContext';

export default function Category() {
  const [categoryButtons, setCategoryButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleCategory, setToggleCategory] = useState({
    meals: [false, false, false, false, false],
    drinks: [false, false, false, false, false],
  });

  const location = useLocation().pathname;

  const fetchCategory = async () => {
    let url = '';

    if (location === '/meals') {
      url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    } else {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    if (location === '/meals' && jsonData.meals) {
      setCategoryButtons(jsonData.meals.slice(0, 5));
    } else if (location === '/drinks' && jsonData.drinks) {
      setCategoryButtons(jsonData.drinks.slice(0, 5));
    }
    setLoading(false);
  };

  const { fetchDataMeals } = useContext(MealsContext);
  const { fetchDataDrinks } = useContext(DrinksContext);

  const handleClick = (buttonName: string, index: number) => {
    if (location === '/meals') {
      const mealsArray = toggleCategory.meals.slice();
      if (!toggleCategory.meals[index]) {
        fetchDataMeals({
          radioSelected: 'category',
          search: buttonName,
        });
        mealsArray[index] = true;
      } else {
        fetchDataMeals({
          radioSelected: 'clear',
          search: '',
        });
        mealsArray[index] = false;
      }
      setToggleCategory({
        ...toggleCategory,
        meals: mealsArray,
      });
    } else if (location === '/drinks') {
      const drinksArray = toggleCategory.drinks.slice();
      if (!toggleCategory.drinks[index]) {
        fetchDataDrinks({
          radioSelected: 'category',
          search: buttonName,
        });
        drinksArray[index] = true;
      } else {
        fetchDataDrinks({
          radioSelected: 'clear',
          search: '',
        });
        drinksArray[index] = false;
      }
      setToggleCategory({
        ...toggleCategory,
        drinks: drinksArray,
      });
    }
  };

  const handleClear = () => {
    if (location === '/meals') {
      fetchDataMeals({
        radioSelected: 'clear',
        search: '',
      });
      setToggleCategory({
        ...toggleCategory,
        meals: [false, false, false, false, false],
      });
    }
    if (location === '/drinks') {
      fetchDataDrinks({
        radioSelected: 'clear',
        search: '',
      });
      setToggleCategory({
        ...toggleCategory,
        drinks: [false, false, false, false, false],
      });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [location]);

  return (
    <div>
      { loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          { categoryButtons.map((category: any, index) => (
            <button
              onClick={ () => handleClick(category.strCategory, index) }
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
            >
              { category.strCategory }
            </button>
          )) }
          <button
            onClick={ handleClear }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
      ) }
    </div>
  );
}
