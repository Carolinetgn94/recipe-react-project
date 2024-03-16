import './RecipeItem.css'
import { Link } from "react-router-dom"

function RecipeItem (props) {
    const {item} = props
    return (
        <div className="recipe-item-container">
            <div className="recipe-item-box">
                <img src={item.image_url} alt="recipe item" key={item.id}/>
            </div>
            <div>
                <h3 className='recipe-title'>{item.title}</h3>
                <Link to={`/recipe-item/${item.id}`} className="recipe-item-link">
                    Recipe Details 
                </Link>
            </div>
        </div>
    )
}

export default RecipeItem