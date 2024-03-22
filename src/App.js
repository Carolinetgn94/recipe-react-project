import {Route, useHistory} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Favourites from "./Favourites";
import Details from "./Details";
import Header from "./Header";
import { React, useState, createContext } from "react";
import axios from 'axios';


export const dataContext = createContext('');
console.log("dataContext", dataContext);
const recipeApiKey = process.env.REACT_APP_APIKEY;
const bearerToken = process.env.REACT_APP_BEARERTOKEN;
console.log("bearerToken", bearerToken);
console.log("token", process.env.REACT_APP_BEARERTOKEN)
const createRecordsUrl = 'https://api.airtable.com/v0/app2O5aomZfslC3yO/Table%201';


function App() {
const [searchInput, setSearchInput] = useState("");
const [recipeList, setRecipeList] = useState([]);
const [recipeDetailsData, setRecipeDetailsData] = useState("");
const [favouriteList, setFavouriteList] = useState([]);
const history = useHistory();


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

history.listen((location, action) => {
  if (action === 'PUSH' && location.pathname === '/') {
    setRecipeList([]);
  }
})

async function handleAddToFavourite(currentRecipe) {
  try {
    console.log(currentRecipe);
    let addedFavouriteList = [...favouriteList];
    const index = addedFavouriteList.findIndex(recipe => recipe.id === currentRecipe.id);

    if (index === -1) {
      addedFavouriteList.push(currentRecipe);
    } else {
      addedFavouriteList.splice(index);
    }

    await setFavouriteList(addedFavouriteList);

    // Call axios.post to update the record in Airtable
    await axios.post(
      createRecordsUrl,
      {
        records: [
          {
            fields: {
              title: currentRecipe.title,
              id: currentRecipe.id,
              image_url: currentRecipe.image_url,
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

    console.log("Added to favourites successfully!");
  } catch (error) {
    console.error("Error adding to favourites:", error);
  }
}


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
