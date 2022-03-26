import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = ({ cats }) => {
  return (
    <>
      {cats.map((cat) => {
        return (
          <div className="pet-cards-container" key={cat.id}>
            <Card
              name={cat.name}
              phone={cat.phone}
              email={cat.email}
              image={cat.image}
              isFavorite={cat.favoured}
            />
          </div>
        );
      })}
    </>
  );
};

export default Cards;
