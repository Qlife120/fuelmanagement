import React, { useState } from "react";
import axios from "axios";

function AddConsumption() {
  const [matricule, setMatricule] = useState("");
  const [consumptionDate, setConsumptionDate] = useState("");
  const [consumption, setConsumption] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/newconsumption?matricule="+matricule+"&consumptionDate="+consumptionDate+"&consumption="+consumption)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container">
      <h2>Ajouter une Consommation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date de consommation:</label>
          <input
            type="date"
            value={consumptionDate}
            onChange={(e) => setConsumptionDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Consommation (L):</label>
          <input
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Matricule du moteur:</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Ajouter la consommation</button>
      </form>
    </div>
  );
}

export default AddConsumption;
