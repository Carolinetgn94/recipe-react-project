import {Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Favourites from "./Favourites";
import Details from "./Details";
import Header from "./Header";

function App() {
  return (
    <div className="App">
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
   

     
    </div>
  );
}

export default App;
