import React, { useState } from "react";
import axios from "axios";

function CalculateTotalConsumption() {
  const [matricule, setMatricule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalConsumption, setTotalConsumption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`/api/totalconsumption?matricule=${matricule}&startDate=${startDate}&endDate=${endDate}`)
      .then((res) => setTotalConsumption(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Calculer la Consommation Totale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricule du moteur:</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date de début:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculer</button>
      </form>

      {totalConsumption && (
        <div className="result">
          <h3>Consommation Totale: {totalConsumption} litres</h3>
        </div>
      )}
    </div>
  );
}

export default CalculateTotalConsumption;
