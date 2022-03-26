import React, { useState } from "react";
import "./Card.css";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";

const Card = ({ name, phone, email, image, isFavorite }) => {
  const [isFavored, setIsFavored] = useState(isFavorite);

  const handleToggle = () => {
    setIsFavored(!isFavored);
  };

  return (
    <article className="card">
      <div className="card-header">
        <img className="card-img" src={image.url} alt={image.alt} />
        <button className="heart" onClick={handleToggle}>
          {isFavored ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outlined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
