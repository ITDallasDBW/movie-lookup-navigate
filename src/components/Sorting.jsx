import React, { useState } from "react";

const Sorting = ({ moviesToSort, onSort }) => {
  // console.log("dataToSort received", dataToSort);

  const handleSortChange = (e) => {
    const sortMethod = e.target.value;
    let sorted = [...moviesToSort];

    switch (sortMethod) {
      case "A_Z":
        sorted.sort((a, b) => a.Title.localeCompare(b.Title));
        // console.log(sorted);
        break;
      case "Z_A":
        sorted.sort((b, a) => a.Title.localeCompare(b.Title));
        // console.log(sorted);
        break;
      case "H_L":
        sorted.sort((b, a) => a.Year.localeCompare(b.Year));
        // console.log(sorted);
        break;
      case "L_H":
        sorted.sort((a, b) => a.Year.localeCompare(b.Year));
        // console.log(sorted);
        break;
      default:
        sorted = moviesToSort;
        // console.log(sorted);
    }

    onSort(sorted);
    console.log(sorted);
      };

    return (
      <>
        <h3>This is Sorting</h3>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" onChange={handleSortChange}>
          <option value="">Choose sorting option...</option>
          <option value="A_Z">Alpha A</option>
          <option value="Z_A">Alpha Z</option>
          <option value="L_H">Oldest First</option>
          <option value="H_L">Newest First</option>
        </select>
      </>
    );
};

export default Sorting;
