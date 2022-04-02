import React, { useContext } from "react";
import "./Cards.css";
import Card from "../Card/Card";
import { PetsContext } from "../Pets/Pets";

const Cards = () => {
  const { cats } = useContext(PetsContext);

  return (
    <>
      {cats.map((cat, index) => {
        return (
          <div className="pet-cards-container" key={cat.id}>
            <Card
              name={cat.name}
              phone={cat.phone}
              email={cat.email}
              image={cat.image}
              isFavorite={cat.favorite}
              index={index}
            />
          </div>
        );
      })}
    </>
  );
};

export default Cards;
