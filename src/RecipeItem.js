import "./RecipeItem.css";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { Button } from "antd";


function RecipeItem(props) {
  const { item } = props;
  return (
    <div className="recipe-item-container">
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
              justifyItems: "center",
            }}
          />
        }
      >
        <div className="recipe-title">
            <h2
              style={{ width: "100%", height:"40px", marginTop: "-5px", fontSize:"17px" }}>   
              {item.title}
            </h2>          
        </div>
        <div style={{ marginTop: "15px" }}>
          <Link to={`/recipe-item/${item.id}`} className="recipe-item-link">
            <Button variant="outlined"> Recipe Details </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default RecipeItem;
