import React from "react";
import { Card } from "antd";
import "./Highlights.css";
import { Button } from "antd";

const { Meta } = Card;

function Highlights() {
  return (
    <div className="articleposts">
      <Card
        hoverable
        style={{
          width: '350px',
          height: '350px',
          margin: '20px',
        }}
        cover={
          <img
            alt="blog1"
            src="https://images.everydayhealth.com/images/diet-nutrition/benefits-of-meal-planning-alt-1440x810.jpg?sfvrsn=b136e610_5"
          />
        }
      >
        <Meta title={<div style={{ width: '100%' }}>
            Lowering stress levels with meal prep</div>}
        description="Getty Images"
         />
         <div style={{marginTop: '20px'}}>
            <a href="https://www.everydayhealth.com/diet-nutrition/scientific-benefits-of-meal-prepping/" target="_blank">
        <Button variant="outlined">Read More</Button>
        </a>
         </div>
        
      </Card>
    </div>
  );
}

export default Highlights;
