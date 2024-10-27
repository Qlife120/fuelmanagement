import React, { useEffect, useState, useCallback } from 'react';
import Card from "../components/Card.js";
import { getTotalConsumptionCurrentMonth, getMaxConsumptionOfMonth, getGraphConsumptions, calculateTotalConsumption } from "../services/consumptionService.js";
import { getTotalEngines } from "../services/engineService.js";
import '../styles/Overview.css';
import FilterForm from '../components/FilterForm.js';
import ConsumptionGraph from '../components/ConsumptionGraph.js';

const OverviewPage = () => {
  const [keyNumbers, setKeyNumbers] = useState([]);
  const [filteredtotalConsumption, setFilteredtotalConsumption] = useState(null);
  const [dataConsumptions, setDataConsumptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalConsumptionCurrentMonth = await getTotalConsumptionCurrentMonth();
        const totalEngines = await getTotalEngines();
        const maxConsumptionOfMonth = await getMaxConsumptionOfMonth();

        setKeyNumbers([
          { title: 'Total des moteurs', value: `${totalEngines}` },
          { title: 'Total des Consommations -Dernier mois-', value: `${totalConsumptionCurrentMonth}` },
          { title: 'Maximum des Consommations -Dernier mois-', value: `${maxConsumptionOfMonth.second} (${maxConsumptionOfMonth.first})` }
        ]);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const fetchFilteredData = useCallback(async (matricule, startDate, endDate) => {
    try {
      if (matricule && startDate && endDate) {
        const filteredtotalConsumptionData = await calculateTotalConsumption(matricule, startDate, endDate);
        setFilteredtotalConsumption(filteredtotalConsumptionData);

        const arrayConsumptions = await getGraphConsumptions(matricule, startDate, endDate);
        setDataConsumptions({ arrayConsumptions, startDate, endDate });
      }
    } catch (error) {
      console.error("Error fetching filtered data from API:", error);
    }
  }, []);
  console.log('overview:',{'key': keyNumbers,'data': dataConsumptions,'filtered': filteredtotalConsumption});
  return (
    <div className="container">
      <div className="cards-container">
        {keyNumbers.map((item) => <Card title={item.title} value={item.value} />)}
      </div>
      <div className="filter-container">
        <div className="form-card-section">
          <FilterForm refreshData={fetchFilteredData} />
          <div className="cards-container">
          <Card title= {'Total des Consommations'} value= {filteredtotalConsumption} index={4} />
          </div>
        </div>
        <div className="chart-section">
          <ConsumptionGraph consumptionData={dataConsumptions || {}} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
