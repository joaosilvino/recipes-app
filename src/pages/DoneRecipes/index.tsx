import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../../type';

export default function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState<DoneRecipeType[]>([]);
  const [filter, setFilter] = useState('all');
  const [shareMessage, setShareMessage] = useState<boolean>(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    setRecipesDone(doneRecipes);
  }, []);

  const filteredRecipes = filter === 'all'
    ? recipesDone
    : recipesDone.filter((recipe) => recipe.type === filter);

  const copyText = async (recipe: DoneRecipeType) => {
    const recipeUrl = `${window.location.origin}/${recipe.type}/${recipe.id}`;

    try {
      await navigator.clipboard.writeText(recipeUrl);
      setShareMessage(true);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  return (
    <div>
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        onClick={ () => setFilter('meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        onClick={ () => setFilter('drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>
      <ul>
        {filteredRecipes.map((recipe, index) => (
          <li key={ index }>
            <Link to={ `/${recipe.type}/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meals'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyText(recipe) }
            >
              Share

            </button>
            <div>
              {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
