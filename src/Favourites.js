import { useContext } from "react";
import RecipeItem from "./RecipeItem";
import { dataContext } from "./App";

function Favourites() {
  
    const { favouriteList } = useContext(dataContext);

  return (
    <div className="home-page">
      {favouriteList && favouriteList.length > 0
        ? favouriteList.map((item) => <RecipeItem item={item} />)
        : `Nothing is added to your favourite`}
    </div>
  );
}

export default Favourites;
