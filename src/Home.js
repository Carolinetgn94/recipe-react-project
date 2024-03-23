import { useContext } from "react"
import { dataContext } from "./App"
import RecipeItem from "./RecipeItem"
import './Home.css'

function Home() {
    const {recipeList} = useContext(dataContext);

    
    return (
        <div className="home-page">
            {recipeList && recipeList.length > 0  
            ? recipeList.map(item => <RecipeItem item={item} />)
            : `Search for something`}
        </div>
    )
}

export default Home 