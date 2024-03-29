import {Route, useHistory} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Favourites from "./Favourites";
import Details from "./Details";
import Header from "./Header";
import { React, useState, createContext } from "react";



export const dataContext = createContext('');
console.log("dataContext", dataContext);
const recipeApiKey = process.env.REACT_APP_APIKEY;
const bearerToken = process.env.REACT_APP_BEARERTOKEN;
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
      setRecipeList(data.data.recipes);
      setSearchInput("");
      history.push("./")
    }
    console.log(data)
  } catch(e) {
    console.log(e);
  }
}

  return (
    <div className="App">
      <dataContext.Provider value={
        {searchInput, setSearchInput, 
        handleSubmit,
        recipeList, setRecipeList, 
        recipeDetailsData, setRecipeDetailsData, 
        favouriteList, setFavouriteList,
        createRecordsUrl, bearerToken}}>
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
