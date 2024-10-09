import React, { useState } from "react";
import axios from "axios";

function AddEngine() {
  const [matricule, setMatricule] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/newengine?matricule="+matricule+"&engineName="+model)  //, { matricule, model })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="form-container">
      <h2>Ajouter un Nouveau Moteur</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label>Modèle du moteur:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Ajouter le moteur</button>
      </form>
    </div>
  );
}

export default AddEngine;
