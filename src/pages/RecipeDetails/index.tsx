import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DoneRecipeType, DrinkType, FavoriteRecipeType, MealType } from '../../type';
import MealCard from '../../components/MealCard';
import DrinkCard from '../../components/DrinkCard';
import style from './style.module.css';
import shareIcon from '../../images/shareIcon.svg';
import heart_checked from '../../images/blackHeartIcon.svg';
import heart_unchecked from '../../images/whiteHeartIcon.svg';

export default function RecipeDetails() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipeMealData, setRecipeMealData] = useState<MealType | null>(null);
  const [recipeDrinkData, setRecipeDrinkData] = useState<DrinkType | null>(null);
  const [recipeType, setRecipeType] = useState<string>('');
  const [showButtonStart, setShowButtonStart] = useState<boolean>();
  const [buttonType, setButtonType] = useState<string>('');
  const [shareMessage, setShareMessage] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const type = location.split('/');
  useEffect(() => {
    const getData = async () => {
      let URL_API = '';
      if (type[1] === 'meals') {
        setRecipeType('meal');
        URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(URL_API);
        const { meals } = await response.json();
        setRecipeMealData(meals[0]);
      }
      if (type[1] === 'drinks') {
        setRecipeType('drink');
        URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(URL_API);
        const { drinks } = await response.json();
        setRecipeDrinkData(drinks[0]);
      }
    };
    const verifyLocalStorage = () => {
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
      }
    };
    const addTypeButton = () => {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
      if (id && Object.keys(inProgress[type[1]]).includes(id)) setButtonType('continue');
      else {
        setButtonType('start');
        setShowButtonStart(!JSON.parse(localStorage.getItem('doneRecipes') as string)
          .some((receita: DoneRecipeType) => receita.id === id));
      }
    };
    const recipesIsFavorite = () => {
      setIsFavorite(JSON.parse(localStorage.getItem('favoriteRecipes') as string)
        .some((recipe: FavoriteRecipeType) => recipe.id === id));
    };
    getData();
    verifyLocalStorage();
    addTypeButton();
    recipesIsFavorite();
  }, [id, location, type]);

  const copyText = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage(true);
  };

  const addFavoriteRecipe = (storageData: FavoriteRecipeType[]) => {
    setIsFavorite(true);
    if (recipeMealData !== null && recipeType === 'meal') {
      const recipeItem = {
        id: recipeMealData.idMeal,
        type: recipeType,
        nationality: recipeMealData.strArea,
        category: recipeMealData.strCategory,
        alcoholicOrNot: '',
        name: recipeMealData.strMeal,
        image: recipeMealData.strMealThumb,
      };
      const updateFavorites = [...storageData, recipeItem];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
    }
    if (recipeDrinkData !== null && recipeType === 'drink') {
      const recipeItem = {
        id: recipeDrinkData.idDrink,
        type: recipeType,
        nationality: '',
        category: recipeDrinkData.strCategory,
        alcoholicOrNot: recipeDrinkData.strAlcoholic,
        name: recipeDrinkData.strDrink,
        image: recipeDrinkData.strDrinkThumb,
      };
      const updateFavorites = [...storageData, recipeItem];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
    }
  };

  const removeFavoriteRecipe = (storageData: FavoriteRecipeType[]) => {
    const removedFavorite = storageData.filter((recipe) => recipe.id !== id);
    setIsFavorite(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedFavorite));
  };

  const favoriteRecipe = () => {
    const storageData = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (isFavorite) removeFavoriteRecipe(storageData);
    else addFavoriteRecipe(storageData);
  };

  return (
    <main>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyText }
      >
        <img src={ shareIcon } alt="ícone do botão compartilhar" />
      </button>
      <button
        type="button"
        onClick={ favoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? heart_checked : heart_unchecked }
          alt="imagem de coração"
        />
      </button>
      {shareMessage && (
        <h4>Link copied!</h4>
      )}
      {(recipeMealData !== null || recipeDrinkData !== null) && (
        recipeType === 'meal' ? (
          recipeMealData !== null && (
            <MealCard recipeMealData={ recipeMealData } />
          )
        ) : (
          recipeDrinkData !== null && (
            <DrinkCard recipeDrinkData={ recipeDrinkData } />
          )
        )
      )}
      {buttonType === 'continue' ? (
        <button
          className={ style.btnStartRecipe }
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>
      ) : (
        showButtonStart && (
          <button
            className={ style.btnStartRecipe }
            data-testid="start-recipe-btn"
            type="button"
            onClick={
              () => navigate(`/${type[1]}/${id}/in-progress`)
            }
          >
            Start Recipe
          </button>
        )
      )}
    </main>
  );
}
