import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "./App";
import './Details.css';
import axios from 'axios';
import { Button } from "antd";


function Details() {
  const { id } = useParams();
  const { 
    recipeDetailsData, setRecipeDetailsData, 
    favouriteList, setFavouriteList,
    createRecordsUrl, bearerToken
    } = useContext(dataContext);

    const [isFavourite, setIsFavourite] = useState(false);

const getRecordId = async (recipeId) => {
    try {
        const response = await axios.get(createRecordsUrl, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }, 
            params: {
                filterByFormula: `{id} = '${recipeId}'`,
            }
        });
        if (response.data && response.data.records && response.data.records.length > 0) {
            const recordId = response.data.records[0].id;
            console.log("Record ID:", recordId)
            return recordId;
        } else {
            console.error("Record not found for recipe ID:", recipeId);
            return null;
        }
    } catch (error) {
        console.error("Error fetching record ID:", error);
        return null;
    }
}

useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data.data) {
        setRecipeDetailsData(data.data.recipe);
        // Check if the current recipe is in the favourites list
        if (data.data.recipe && data.data.recipe.id) {
          setIsFavourite(favouriteList.some((recipe) => recipe.id === data.data.recipe.id));
        }
      }
    }
    getRecipeDetails();
  }, []);
  console.log("recipeDetailsData", recipeDetailsData);


const toggleFavourite = async () => {
    try {
      if (isFavourite) {
        // Remove from favorites
        const recordId = await getRecordId(recipeDetailsData.id);
        if (recordId) {
          await axios.delete(`${createRecordsUrl}/${recordId}`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          });
          const updatedFavouriteList = favouriteList.filter((recipe) => recipe.id !== id);
          setIsFavourite(false);
          setFavouriteList(updatedFavouriteList);
        }
      } else {
        // Add to favorites
        await axios.post(
          createRecordsUrl,
          {
            records: [
              {
                fields: {
                  id: recipeDetailsData.id,
                  title: recipeDetailsData.title,
                  image_url: recipeDetailsData.image_url,
                },
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsFavourite(true);
        setFavouriteList([...favouriteList, recipeDetailsData]);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-info">
        <img
          src={recipeDetailsData.image_url}
          className="recipe-details-image"
          style={{ borderRadius: "50px" }}
        />
      </div>

      <span className="recipe-details-publisher">
        From: {recipeDetailsData.publisher}
      </span>
      <h3 className="recipe-details-title">{recipeDetailsData.title}</h3>
      <div>
      <Button variant="outlined" onClick={toggleFavourite} className="favouriteButton">
            {isFavourite ? "Remove From Favourites" : "Add To Favourites"}
        </Button>
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
