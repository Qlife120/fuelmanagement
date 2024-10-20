import React, {useEffect, useState} from "react";
import AddEngineForm from "../components/AddEngineForm.js";
import TableEngines from "../components/TableEngines.js";
import { getLastTenEnginesAdded } from "../services/engineService.js";
import "../styles/Page.css"; // Import the CSS file for styling

const EnginePage = () => {

  const [lastEngines, setLastEngines] = useState([]);
    
  
  // Fetch data from the API when the component mounts
  const fetchLastEngines = async () => {
      try {
      const enginesData = await getLastTenEnginesAdded();
      setLastEngines(enginesData);
      } catch (error) {
      console.error("Error fetching last 10 engines:", error);
      }
  };

  useEffect(() => {
  fetchLastEngines();
  }, []);

  
  return (
    <div className="page-container">
      <div className="form-section">
        <AddEngineForm refreshData={fetchLastEngines}/>
      </div>
      <div className="table-section">
        <TableEngines lastEngines={lastEngines}/>
      </div>
    </div>
  );
};

export default EnginePage;
