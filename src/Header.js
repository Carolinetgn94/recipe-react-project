import { Link } from "react-router-dom"
import './Header.css'
import { useContext } from "react"
import { dataContext } from "./App"
import { Button } from "antd";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import logo from './recipe logo.png'

function Header() {
    const {searchInput, setSearchInput, handleSubmit, setRecipeList} = useContext(dataContext);
    console.log(searchInput)

    // Clear recipelist when home clicked
    const clearRecipeList = () => {
        setRecipeList([]);
    };

    return (
        <div className="header">
            <div className="recipe-logo">
            <Link to={"/"} onClick={clearRecipeList}>
            <img src={logo} alt="Recipe Logo" style={{ width: '100px', height: 'auto' }}/>
          </Link>
            </div>
            <form onSubmit={handleSubmit} className="searchbarbutton">
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="E.g. Chicken"
            type="text"
            name="search"
            className="searchbar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
      />
       <Button onClick={handleSubmit} variant="outlined">Search</Button>
    </Box>
            </form>
            <div className="menu-items">
                <h2>
                    <Link to={'/'} onClick={clearRecipeList} className="menu-link" >Home</Link>                
                </h2>
                <h2>
                     <Link to={'/favourites'} className="menu-link" >Favourites</Link>
                </h2>
            </div>
        </div>
    )
}

export default Header