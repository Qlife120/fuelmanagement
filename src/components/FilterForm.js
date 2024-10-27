import React, { useState, useEffect } from "react";
import { getAllEngines } from "../services/engineService.js";
import "../styles/Form.css";
import { STARTING_DATE, TODAY_DATE } from '../utils/Global.js';

function FilterForm({ refreshData }) {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [matricules, setMatricules] = useState([]);
  const [selectedMatricule, setSelectedMatricule] = useState('');

  useEffect(() => {
    if (selectedMatricule && startDate && endDate) {
      refreshData(selectedMatricule, startDate, endDate);
    }
  }, [selectedMatricule, startDate, endDate, refreshData]);

  useEffect(() => {
    const fetchMatriculesList = async () => {
      try {
        const listEnginesData = await getAllEngines();
        const listMatricules = listEnginesData.map(engine => engine.matricule);
        setMatricules(listMatricules);
        if (listMatricules.length > 0) setSelectedMatricule(listMatricules[0]);
      } catch (error) {
        console.error("Error retrieving the list of engines:", error);
      }
    };

    fetchMatriculesList();
  }, []);

  console.log('filtre:',{'mat': selectedMatricule,'start': startDate,'end': endDate});
  return (
    
    <div className="form-container">
    <h2>Filtre de Recherche</h2>
      <div className="form-group">
        <label>Matricule du moteur:</label>
        <select value={selectedMatricule} onChange={(e) => setSelectedMatricule(e.target.value)} className="input-field">
          {matricules.map(matricule => (
            <option key={matricule} value={matricule}>{matricule}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date de début:</label>
        <input
          type="date"
          min={STARTING_DATE}
          max={TODAY_DATE}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Date de fin:</label>
        <input
          type="date"
          min={STARTING_DATE}
          max={TODAY_DATE}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="input-field"
        />
      </div>
    </div>
  );
}

export default FilterForm;
