import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../type';

type MealCardProps = {
  recipeMealData: MealType;
};

export default function MealCard({ recipeMealData }: MealCardProps) {
  const [drinksData, setDrinksData] = useState<DrinkType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      setDrinksData(drinks);
    };
    getData();
  }, []);

  return (
    <>
      <section>
        <img
          data-testid="recipe-photo"
          src={ recipeMealData.strMealThumb }
          alt="imagem da receita"
        />
        <h2 data-testid="recipe-title">{recipeMealData.strMeal}</h2>
        <h3 data-testid="recipe-category">{recipeMealData.strCategory}</h3>
        <ul>
          {Object.keys(recipeMealData)
            .filter((key) => key.includes('strIngredient'))
            .map((ingredient: string, index: number) => (
              recipeMealData[ingredient] !== null && recipeMealData[ingredient] !== ''
              && (
                <li key={ index }>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${recipeMealData[ingredient]}`}
                  </p>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${recipeMealData[`strMeasure${Number(index) + 1}`]}`}
                  </p>
                </li>
              )
            ))}
        </ul>
        <p data-testid="instructions">{recipeMealData.strInstructions}</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `${recipeMealData.strYoutube}`.replace('watch?v=', '/embed/') }
          title="YouTube video player"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
          allowFullScreen
        >
          player
        </iframe>
      </section>
      {drinksData.length! && (
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div data-testid="0-recommendation-card">
                <img src={ drinksData[0].strDrinkThumb } alt="" />
                <h5 data-testid="0-recommendation-title">{drinksData[0].strDrink}</h5>
              </div>
              <div data-testid="1-recommendation-card">
                <img src={ drinksData[1].strDrinkThumb } alt="" />
                <h5 data-testid="1-recommendation-title">{drinksData[1].strDrink}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="2-recommendation-card">
                <img src={ drinksData[2].strDrinkThumb } alt="" />
                <h5 data-testid="2-recommendation-title">{drinksData[2].strDrink}</h5>
              </div>
              <div data-testid="3-recommendation-card">
                <img src={ drinksData[3].strDrinkThumb } alt="" />
                <h5 data-testid="3-recommendation-title">{drinksData[3].strDrink}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="4-recommendation-card">
                <img src={ drinksData[4].strDrinkThumb } alt="" />
                <h5 data-testid="4-recommendation-title">{drinksData[4].strDrink}</h5>
              </div>
              <div data-testid="5-recommendation-card">
                <img src={ drinksData[5].strDrinkThumb } alt="" />
                <h5 data-testid="5-recommendation-title">{drinksData[5].strDrink}</h5>
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

// <div
//   id="carouselExampleInterval"
//   className="carousel slide"
//   data-bs-ride="carousel"
// >
//   <div className="carousel-inner">
//     <div className="carousel-item active">
//       <div data-testid="0-recommendation-card">
//         <img src={ drinksData[0].strDrinkThumb } alt="" />
//         <h5 data-testid="0-recommendation-title">{drinksData[0].strDrink}</h5>
//       </div>
//       <div data-testid="0-recommendation-card">
//         <img src={ drinksData[1].strDrinkThumb } alt="" />
//         <h5 data-testid="0-recommendation-title">{drinksData[1].strDrink}</h5>
//       </div>
//     </div>
//     <div className="carousel-item">
//       <div data-testid="1-recommendation-card">
//         <img src={ drinksData[2].strDrinkThumb } alt="" />
//         <h5 data-testid="1-recommendation-title">{drinksData[2].strDrink}</h5>
//       </div>
//       <div data-testid="1-recommendation-card">
//         <img src={ drinksData[3].strDrinkThumb } alt="" />
//         <h5 data-testid="1-recommendation-title">{drinksData[3].strDrink}</h5>
//       </div>
//     </div>
//     <div className="carousel-item">
//       <div data-testid="2-recommendation-card">
//         <img src={ drinksData[4].strDrinkThumb } alt="" />
//         <h5 data-testid="2-recommendation-title">{drinksData[4].strDrink}</h5>
//       </div>
//       <div data-testid="2-recommendation-card">
//         <img src={ drinksData[5].strDrinkThumb } alt="" />
//         <h5 data-testid="2-recommendation-title">{drinksData[5].strDrink}</h5>
//       </div>
//     </div>
//   </div>
//   <button
//     className="carousel-control-prev"
//     type="button"
//     data-bs-target="#carouselExampleInterval"
//     data-bs-slide="prev"
//   >
//     <span className="carousel-control-prev-icon" aria-hidden="true" />
//   </button>
//   <button
//     className="carousel-control-next"
//     type="button"
//     data-bs-target="#carouselExampleInterval"
//     data-bs-slide="next"
//   >
//     <span className="carousel-control-next-icon" aria-hidden="true" />
//   </button>
// </div>
