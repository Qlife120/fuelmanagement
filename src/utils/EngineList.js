import React, { useState, useEffect } from "react";
import axios from "axios";

function EngineList() {
  const [engines, setEngines] = useState([]);

  useEffect(() => {
    axios
      .get("/api/engines")
      .then((res) => setEngines(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Engines</h2>
      <ul>
        {engines.map((engine) => (
          <li key={engine.matricule}>
            {engine.matricule} - {engine.engineName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EngineList;
