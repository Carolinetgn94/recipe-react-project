import { Link } from "react-router-dom"
import './Header.css'
import { useContext } from "react"
import { dataContext } from "./App"

function Header() {
    const {searchInput, setSearchInput, handleSubmit} = useContext(dataContext);
    console.log(searchInput)

    return (
        <div className="header">
            <div className="recipe-logo">
               <h1>
                <Link to={'/'}>Recipes4U</Link>
                </h1> 
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="search" 
                placeholder="What recipes do u want?" 
                className="searchbar"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}>
                </input>
            </form>
            <div className="menu-items">
                <h2>
                    <Link to={'/'}>Home</Link>                
                </h2>
                <h2>
                     <Link to={'/favourites'}>Favourites</Link>
                </h2>
            </div>
        </div>
    )
}

export default Header