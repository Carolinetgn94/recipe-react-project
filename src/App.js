import {Route} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Favourites from "./Favourites";
import Details from "./Details";
import Header from "./Header";
import { React, useState, createContext } from "react";


export const dataContext = createContext('');
console.log("dataContext", dataContext)
const recipeApiKey = process.env.REACT_APP_APIKEY;


function App() {
const [searchInput, setSearchInput] = useState("");
const [recipeList, setRecipeList] = useState([]);
const [recipeDetailsData, setRecipeDetailsData] = useState("");
const [favouriteList, setFavouriteList] = useState([])

async function handleSubmit(e){
  e.preventDefault();
  try {
    const res = await fetch
    (`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}&key=${recipeApiKey}`);
    
    const data = await res.json();
    if(data.data.recipes) {
      setRecipeList(data.data.recipes)
      setSearchInput("")
    }
    console.log(data)
  } catch(e) {
    console.log(e);
  }
}

function handleAddToFavourite(currentRecipe) {
  console.log(currentRecipe);
  let addedFavouriteList = [...favouriteList];
  const index = addedFavouriteList.findIndex(recipe => recipe.id === currentRecipe.id)

  if(index === -1) {
    addedFavouriteList.push(currentRecipe)
  } else {
    addedFavouriteList.splice(index)
  }
  setFavouriteList(addedFavouriteList)
}

console.log('recipeList', recipeList)
console.log('favlist', favouriteList);

  return (
    <div className="App">
      <dataContext.Provider value={
        {searchInput, setSearchInput, 
        handleSubmit, handleAddToFavourite,
        recipeList, setRecipeList, 
        recipeDetailsData, setRecipeDetailsData, 
        favouriteList, setFavouriteList}}>
        <Header />
      
         <main>
        <Route exact path="/">
          <Home />
        </Route> 

        <Route exact path="/favourites">
          <Favourites />
        </Route> 

        <Route exact path="/recipe-item/:id">
          <Details />
        </Route> 
      </main>
  
 </dataContext.Provider>
     
    </div>
  );
}

export default App;
