import React from "react";
import "./Filter.css";

const Filter = ({ filters, setFilters }) => {
  return (
    <div className="pet-filter-container">
      <div className="filter-container ">
        <label htmlFor="favorite">Favorite</label>
        <select
          name="favorite"
          id="favorite"
          className="form-select"
          onChange={(e) =>
            setFilters({
              ...filters,
              favorite: e.target.value,
            })
          }
        >
          <option value="any">Any</option>
          <option value="favorite">Favorite</option>
          <option value="not favorite">Not Favorite</option>
        </select>
      </div>
      <div className="filter-container ">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
