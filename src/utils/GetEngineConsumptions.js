import React, { useState } from "react";
import axios from "axios";

function GetEngineConsumptions() {
  const [matricule, setMatricule] = useState("");
  const [consumptions, setConsumptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`/api/consumptions?matricule=${matricule}`)
      .then((res) => setConsumptions(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="table-container">
      <h2>Voir les Consommations</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <label>Matricule du moteur:</label>
        <input
          type="text"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn">Rechercher</button>
      </form>

      {consumptions.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Consommation (L)</th>
            </tr>
          </thead>
          <tbody>
            {consumptions.map((consumption, index) => (
              <tr key={index}>
                <td>{new Date(consumption.consumptionDate).toLocaleDateString()}</td>
                <td>{consumption.consumption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetEngineConsumptions;
