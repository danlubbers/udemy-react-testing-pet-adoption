import React, { useEffect, useState } from "react";
import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import axios from "axios";

const Pets = () => {
  const [cats, setCats] = useState([]);

  const fetchCats = async () => {
    const res = await axios.get("http://localhost:4000/cats");
    setCats(res.data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container">
      <div className="app-container">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  );
};

export default Pets;
