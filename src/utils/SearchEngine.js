import React, { useState } from "react";
import axios from "axios";

function SearchEngine() {
  const [matricule, setMatricule] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/api/enginesearch?matricule=${matricule}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Search Engine by Matricule</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((engine) => (
          <li key={engine.matricule}>
            {engine.matricule} - {engine.engineName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchEngine;
