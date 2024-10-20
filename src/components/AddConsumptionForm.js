import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import {addConsumption,} from "../services/consumptionService.js";
import {getAllEngines, } from "../services/engineService.js";
import "../styles/Form.css";

function AddConsumptionForm({refreshData}) {

  const [consumptionDate, setConsumptionDate] = useState("");
  const [consumption, setConsumption] = useState(0);

  const [matricules, setMatricules] = useState([]);
  const [selectedMatricule, setSelectedMatricule] = useState('');

  const [alertSeverity, setAlertSeverity] = useState(null);
  
  // For retrieving array of matricules for the select list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listEnginesData = await getAllEngines(); // Fetching engine data from API
        const listMatricules = listEnginesData.map(engine => engine.matricule); // Extracting matricules
        setMatricules(listMatricules); // Setting the matricules state
      } catch (error) {
        console.error("Error retrieving the list of engines:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run on mount only
  
    const handleSelectChange = (event) => {
      setSelectedMatricule(event.target.value);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addConsumption(selectedMatricule, consumption, consumptionDate);
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
      <h2>Ajouter une Consommation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Matricule du moteur:</label>
          <select value={selectedMatricule} onChange={handleSelectChange} className="input-field">
          {matricules.map(matricule => (
            <option key={matricule} value={matricule}>
              {matricule}
            </option>
            ))}
          </select>
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
          <label>Date de consommation:</label>
          <input
            type="date"
            value={consumptionDate}
            onChange={(e) => setConsumptionDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Ajouter la consommation</button>
        <div className="alert">
        {alertSeverity === 'success' && (
        <Alert severity="success" variant="outlined" onClose={() => {}}>Consommation ajoutée avec succès.</Alert>
        )}
        {alertSeverity === 'error' && (
          <Alert severity="error" variant="outlined" onClose={() => {}}>Erreur lors de l'ajout de la consommation. Veuillez réessayer.</Alert>
        )}
        </div>
      </form>
    </div>
    
  );
}

export default AddConsumptionForm;

