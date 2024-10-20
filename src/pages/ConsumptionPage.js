import React, {useEffect, } from "react";
import AddConsumptionsForm from "../components/AddConsumptionForm.js";
// import TableConsumptions from "../components/TableConsumptions.js";
// import getLastTenConsumptionsAdded from "../services/ConsumptionService.js";
import "../styles/Page.css"; // Import the CSS file for styling



const ConsumptionPage = () => {

  // const [lastConsumptions, setLastConsumptions] = useState([]);
    
  
  // Fetch data from the API when the component mounts
  const fetchLastConsumptions = async () => {
      try {
      // const consumptionsData = await getLastTenConsumptionsAdded();
      // setLastConsumptions(consumptionsData);
      } catch (error) {
      console.error("Error fetching last 10 consumptions:", error);
      }
  };

  useEffect(() => {
  fetchLastConsumptions();
  }, []);

  return (
    <div className="page-container">
      <div className="form-section">
        <AddConsumptionsForm refreshData={fetchLastConsumptions}/>
      </div>
      <div className="table-section">
        {/* <TableConsumptions lastConsumptions={lastConsumptions} /> */}
      </div>
    </div>
  );
};

export default ConsumptionPage;
