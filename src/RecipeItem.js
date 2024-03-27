import './RecipeItem.css'
import { Link } from "react-router-dom"
import { Card } from "antd";
import { Button } from "antd";

const { Meta } = Card;

function RecipeItem (props) {
    const {item} = props
    return (
        <div className="recipe-item-container">
            {/* <div className="recipe-item-box">
                <img src={item.image_url} alt="recipe item" key={item.id}/>
            </div>
            <div>
                <h3 className='recipe-title'>{item.title}</h3>
                <Link to={`/recipe-item/${item.id}`} className="recipe-item-link">
                    Recipe Details 
                </Link>
            </div> */}
           
            <Card
        hoverable
        style={{
          width: "300px",
          height: "330px",
          margin: "10px",
          justifyContent: "center",
        }}
        cover={
          <img
            alt="recipe-item"
            src={item.image_url}
            key={item.id}
            style={{
                objectFit: "cover",
                width: "300px",
                height: "200px",
                justifyItems: "center"
            }}
          />
        }
      >
        <Meta
          title={
            <div style={{ width: "100%", marginTop: "5px" }} className='recipe-title'>
              {item.title}
            </div>
          }
        />
        <div style={{ marginTop: "20px" }}>
        <Link to={`/recipe-item/${item.id}`} className="recipe-item-link">
                   <Button variant="outlined"> Recipe Details </Button> 
                </Link>
        </div>
      </Card>
        </div>
    )
}

export default RecipeItem