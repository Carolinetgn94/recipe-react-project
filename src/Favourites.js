import { useContext, useEffect} from "react";
import RecipeItem from "./RecipeItem";
import { dataContext } from "./App";
import axios from "axios";

function Favourites() {

  const { createRecordsUrl, bearerToken, favouriteList, setFavouriteList } = useContext(dataContext);

  useEffect(() => {
    async function fetchFavouriteRecipes() {
      try {
        const response = await axios.get(createRecordsUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          const favourites = data.records.map((record) => ({
            id: record.fields.id,
            title: record.fields.title,
            image_url: record.fields.image_url,
            isFavourite: true,
          }));
          setFavouriteList(favourites);
          console.log('fetched fav: isFavourite', favourites);
        } else {
          console.error("Failed to fetch favorite recipes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    }

    fetchFavouriteRecipes();
  }, [createRecordsUrl, bearerToken, setFavouriteList]);


  return (
    <div className="home-page">
      {favouriteList.length > 0
        ? favouriteList.map((item) => <RecipeItem item={item} key={item.id}/>)
        : `Nothing is added to your favourite`}
    </div>
  );
}

export default Favourites;
