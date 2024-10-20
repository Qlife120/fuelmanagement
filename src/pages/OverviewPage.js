import React, { useEffect, useState } from 'react';
import Card from  "../components/Card.js";
import {getTotalConsumptionCurrentMonth, getMaxConsumptionOfMonth, getGraphConsumptions, calculateTotalConsumption}  from "../services/consumptionService.js";
import {getTotalEngines}  from "../services/engineService.js";
import '../styles/Overview.css'; // Import the updated CSS styles
import FilterForm from '../components/FilterForm.js';
import ConsumptionGraph from '../components/ConsumptionGraph.js';
import { Line } from 'react-chartjs-2';


const OverviewPage = () => {
  // State to hold key numbers and chart data
  const [keyNumbers, setKeyNumbers] = useState([]);
  useEffect(() => {
        const fetchData = async () => {
          try {
            const totalConsumptionCurrentMonth = await getTotalConsumptionCurrentMonth(); // Replace with your API endpoint
            const totalEngines = await getTotalEngines(); // Replace with your API endpoint
            const maxConsumptionOfMonth = await getMaxConsumptionOfMonth();

            setKeyNumbers([
              { title: 'Total des moteurs ', value: `${totalEngines} ` },
              { title: 'Total des Consommations -Dernier mois- ', value: `${totalConsumptionCurrentMonth} ` },
              { title: 'Maximum des Consommations -Dernier mois- ', value: `${maxConsumptionOfMonth.second} (${maxConsumptionOfMonth.first}) ` }])

            } catch (error) {
                      console.error("Error fetching data from API:", error);
                    }};
              
                    fetchData(); // Call the fetch function
                }, []);
    
            
  // const [chartData, setChartData] = useState([]);
  const [filteredtotalConsumption, setFilteredtotalConsumption] = useState(0);

  // Fetch data from API
    const fetchFilteredData = async (matricule, startDate, endDate) => {
      try {
        const graphConsumptions = await getGraphConsumptions(matricule, startDate, endDate);
        // setChartData(graphConsumptions);

        const filteredtotalConsumptionData = await calculateTotalConsumption(matricule, startDate, endDate);
        setFilteredtotalConsumption(filteredtotalConsumptionData);
        console.log('test:%d',filteredtotalConsumptionData)
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
  useEffect(() => {
    fetchFilteredData(); // Call the fetch function
  }, []); // Empty dependency array to run only once

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Consumption per Day (kWh)',
        data: [120, 90, 100, 110, 85, 130, 95],
        fill: false,
        borderColor: '#6a1b9a',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Consumption (kWh)',
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="container">
      {/* Cards Container */}
      <div className="cards-container">
        {keyNumbers.map((item, index) => (
          <Card key={index} index={index} item={item} />
        ))}
      </div>

      {/* Chart Container */}
      <div className="chart-container">
      <div className="form-section">
        <FilterForm />
        <Card item={{'title':'Total des Consommations', 'value':filteredtotalConsumption}} index={4}/>
        </div>
        <div className="chart-section">
        {/* <ConsumptionGraph consumptionData={chartData} /> */}
        <Line data={chartData} options={chartOptions} />
        </div>
        
      </div>
    </div>
  );
};

export default OverviewPage;
