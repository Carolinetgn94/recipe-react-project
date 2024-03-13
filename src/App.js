import {Route} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Favourites from "./Favourites";
import Details from "./Details";
import Header from "./Header";
import { useState, createContext } from "react";

export const dataContext = createContext('');
console.log("dataContext", dataContext)

function App() {
const [searchInput, setSearchInput] = useState("");
const [recipeList, setRecipeList] = useState([])

async function handleSubmit(e){
  e.preventDefault();
  try {
    const res = await fetch
    (`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}&key=1ac39aa1-35ce-45f2-a54e-ea0270e69df6
    `);
    
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
console.log(recipeList)

  return (
    <div className="App">
      <dataContext.Provider value={{searchInput, setSearchInput, handleSubmit}}>
        <Header />
      </dataContext.Provider>
      
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
   

     
    </div>
  );
}

export default App;
