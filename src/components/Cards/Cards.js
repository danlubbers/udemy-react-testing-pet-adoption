import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = ({ cats, setCats }) => {
  const updateFavorite = (index, favoriteStatus) => {
    const updatedCats = [...cats];
    updatedCats[index].favorite = favoriteStatus;
    setCats(updatedCats);
  };

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
              updateFavorite={updateFavorite}
            />
          </div>
        );
      })}
    </>
  );
};

export default Cards;
