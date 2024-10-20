import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import {addEngine} from "../services/engineService.js";
import "../styles/Form.css";

function AddEngineForm({refreshData}) {
  
  const [matricule, setMatricule] = useState("");
  const [model, setModel] = useState("");

  const [alertSeverity, setAlertSeverity] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEngine(matricule, model);
      setAlertSeverity('success');
      refreshData();
      // Clear the alert after 3 seconds (3000 ms)
      setTimeout(() => {
        setAlertSeverity(null);
      }, 3000);

    } catch (error) {
      setAlertSeverity('error');

      // Clear the alert after 3 seconds (3000 ms)
      setTimeout(() => {
        setAlertSeverity(null);
      }, 3000);
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
        <button type="submit" className="submit-btn">Ajouter le moteur</button>
        <div className="alert">
        {alertSeverity === 'success' && (
        <Alert severity="success" variant="outlined" onClose={() => {}}>Consommation ajoutée avec succès.</Alert>
        )}
        {alertSeverity === 'error' && (
          <Alert severity="error" variant="standard" onClose={() => {}}>Erreur lors de l'ajout de la consommation. Veuillez réessayer.</Alert>
        )}
        </div>
      </form>
    </div>
    
      );
}

export default AddEngineForm;
