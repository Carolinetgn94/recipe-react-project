import { useContext } from "react"
import { dataContext } from "./App"
import RecipeItem from "./RecipeItem"
import './Home.css'
import Highlights from "./Highlights";


function Home() {
    const {recipeList} = useContext(dataContext);

    
    return (
        <div className="home-page">
            { recipeList.length > 0  
            ? recipeList.map(item => <RecipeItem item={item} />)
            : <Highlights />}
        </div>
    )
}

export default Home 