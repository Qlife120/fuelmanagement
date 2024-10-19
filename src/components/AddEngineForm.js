import React, { useState } from "react";
import {addEngine} from "../services/engineService.js";
import "../styles/AddEngineForm.css";

function AddEngineForm() {
  const [matricule, setMatricule] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEngine = await addEngine(matricule, model);
      alert("Moteur ajouté avec succès.");
      console.log("Nouveau moteur:", newEngine);
    } catch (error) {
      alert("Erreur lors de l'ajout du moteur. Veuillez réessayer.");
      console.log(error);
    }}

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
        {/* <div className="form-group">
          <label>Description du moteur <i>(Optionnel)</i>:</label>
          <input
            type="text"
            value={model}
            // onChange={(e) => setModel(e.target.value)}
            className="input-field"
          />
        </div> */}
        <button type="submit" className="submit-btn">Ajouter le moteur</button>
      </form>
    </div>
  );
}

export default AddEngineForm;
