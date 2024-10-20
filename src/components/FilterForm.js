import React, { useState, useEffect } from "react";
import {getAllEngines, } from "../services/engineService.js";
import "../styles/Form.css";

function FilterForm({refreshData}) {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [matricules, setMatricules] = useState([]);
  const [selectedMatricule, setSelectedMatricule] = useState('');

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

    useEffect(() => {
      const updateEngineData = async () => {
        if (selectedMatricule && startDate && endDate) {
          try {
            
            // Call the function to refresh the table/graph data
            refreshData(selectedMatricule, startDate, endDate);
  
          } catch (error) {
            console.log(error)
          }
        }
      };
  
      updateEngineData();
    }, [selectedMatricule, startDate, endDate, refreshData]); // This effect runs when either matricule or model changes
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addConsumption(selectedMatricule, consumption, consumptionDate);
  //     setAlertSeverity('success');
  // refreshData();
  //     // Clear the alert after 3 seconds (3000 ms)
  //     setTimeout(() => {
  //       setAlertSeverity(null);
  //     }, 3000);

  //   } catch (error) {
  //     setAlertSeverity('error');

  //     // Clear the alert after 3 seconds (3000 ms)
  //     setTimeout(() => {
  //       setAlertSeverity(null);
  //     }, 3000);
  //   }}

  return (
    <div className="form-container">
      {/* <h2>Ajouter une Consommation</h2>*/}
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
          <label>Date de début:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Date de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {/* <button type="submit" className="submit-btn"  onSubmit={handleSubmit}>Afficher</button> */}

    </div>
    
  );
}

export default FilterForm;

