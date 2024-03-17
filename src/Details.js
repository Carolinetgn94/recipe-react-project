import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "./App";
import './Details.css';

function Details() {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData, handleAddToFavourite, favouriteList } = useContext(dataContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data.data) {
        setRecipeDetailsData(data.data.recipe);
      }
    }
    getRecipeDetails();
  }, []);
  console.log("recipeDetailsData", recipeDetailsData);

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-info">
        <img
          src={recipeDetailsData.image_url}
          className="recipe-details-image"
        />
      </div>

      <span className="recipe-details-publisher">
        From: {recipeDetailsData.publisher}
      </span>
      <h3 className="recipe-details-title">{recipeDetailsData.title}</h3>
      <div>
        <button onClick={() => handleAddToFavourite(recipeDetailsData)}className="favouriteButton">
          {favouriteList && favouriteList.length > 0 && favouriteList.findIndex(
            (recipe) => recipe.id === recipeDetailsData.id) !== -1 
          ? `Remove from Favourites`
          : `Add To Favourites`
          }
        </button>
      </div>
      <br />
      <div className="recipe-details-ingredients">
        <span>Ingredients Required: </span>
        <ul className="ingredient-list">
            {recipeDetailsData.ingredients && recipeDetailsData.ingredients.map((ingredient) => (
            <li key={ingredient.description}>
                <span>{ingredient.quantity} {ingredient.unit}</span>
                <span>{ingredient.description}</span>
               
            </li>
            ))}
        </ul>
      </div>
    </div>
  ); 
}

export default Details;
