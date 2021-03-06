import React, { createContext, useEffect, useState } from "react";
import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import axios from "axios";

export const PetsContext = createContext({
  cats: [],
  setCats: () => {},
});

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [filters, setFilters] = useState({
    gender: "any",
    favorite: "any",
  });

  const [filteredCatsArray, setFilteredCatsArray] = useState([]);

  const fetchCats = async () => {
    const res = await axios.get("http://localhost:4000/cats");
    setCats(res.data);
    setFilteredCatsArray(res.data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.gender === filters.gender
      );
    }
    if (filters.favorite !== "any") {
      catsFiltered = catsFiltered.filter(
        (cat) =>
          cat.favorite === (filters.favorite === "favorite" ? true : false)
      );
    }
    setFilteredCatsArray(catsFiltered);
  }, [filters, cats]);

  // const filteredCats = cats.filter(({ gender }) => gender === filters.gender);

  return (
    <div className="container">
      <div className="app-container">
        <PetsContext.Provider value={{ cats: filteredCatsArray, setCats }}>
          <Filter filters={filters} setFilters={setFilters} />
          <Cards />
        </PetsContext.Provider>
      </div>
    </div>
  );
};

export default Pets;
