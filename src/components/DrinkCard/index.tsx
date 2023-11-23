import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../type';

type DrinkCardProps = {
  recipeDrinkData: DrinkType;
};

export default function DrinkCard({ recipeDrinkData }: DrinkCardProps) {
  const [mealsData, setMealData] = useState<MealType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      setMealData(meals);
    };
    getData();
  }, []);

  return (
    <>
      <section>
        <img
          data-testid="recipe-photo"
          src={ recipeDrinkData.strDrinkThumb }
          alt="imagem da receita"
        />
        <h2 data-testid="recipe-title">{recipeDrinkData.strDrink}</h2>
        <h3 data-testid="recipe-category">{recipeDrinkData.strAlcoholic}</h3>
        <ul>
          {Object.keys(recipeDrinkData)
            .filter((key) => key.includes('strIngredient'))
            .map((ingredient: string, index: number) => (
              recipeDrinkData[ingredient] !== null
              && recipeDrinkData[ingredient] !== ''
              && (
                <li key={ index }>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${recipeDrinkData[ingredient]}`}
                  </p>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${recipeDrinkData[`strMeasure${Number(index) + 1}`]}`}
                  </p>
                </li>
              )
            ))}
        </ul>
        <p data-testid="instructions">{recipeDrinkData.strInstructions}</p>
      </section>
      {mealsData.length! && (
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div data-testid="0-recommendation-card">
                <img src={ mealsData[0].strMealThumb } alt="" />
                <h5 data-testid="0-recommendation-title">{mealsData[0].strMeal}</h5>
              </div>
              <div data-testid="1-recommendation-card">
                <img src={ mealsData[1].strMealThumb } alt="" />
                <h5 data-testid="1-recommendation-title">{mealsData[1].strMeal}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="2-recommendation-card">
                <img src={ mealsData[2].strMealThumb } alt="" />
                <h5 data-testid="2-recommendation-title">{mealsData[2].strMeal}</h5>
              </div>
              <div data-testid="3-recommendation-card">
                <img src={ mealsData[3].strMealThumb } alt="" />
                <h5 data-testid="3-recommendation-title">{mealsData[3].strMeal}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="4-recommendation-card">
                <img src={ mealsData[4].strMealThumb } alt="" />
                <h5 data-testid="4-recommendation-title">{mealsData[4].strMeal}</h5>
              </div>
              <div data-testid="5-recommendation-card">
                <img src={ mealsData[5].strMealThumb } alt="" />
                <h5 data-testid="5-recommendation-title">{mealsData[5].strMeal}</h5>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </>
  );
}
