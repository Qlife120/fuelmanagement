import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {getTotalConsumptionCurrentMonth, getMaxConsumptionOfMonth, getGraphConsumptions}  from "../services/consumptionService.js";
import {getTotalEngines}  from "../services/engineService.js";
import '../styles/Overview.css'; // Import the updated CSS styles

const Overview = () => {
  // State to hold key numbers and chart data
  const [keyNumbers, setKeyNumbers] = useState([]);
  useEffect(() => {
        const fetchData = async () => {
          try {
            const totalConsumptionCurrentMonth = await getTotalConsumptionCurrentMonth(); // Replace with your API endpoint
            const totalEngines = await getTotalEngines(); // Replace with your API endpoint
            const maxConsumptionOfMonth = await getMaxConsumptionOfMonth();
            console.log(maxConsumptionOfMonth);

            setKeyNumbers([
              { title: 'Total des moteurs ', value: `${totalEngines} ` },
              { title: 'Total des Consommations -Dernier mois- ', value: `${totalConsumptionCurrentMonth} ` },
              { title: 'Maximum des Consommations -Dernier mois- ', value: `${maxConsumptionOfMonth.second} (${maxConsumptionOfMonth.first}) ` }])

            } catch (error) {
                      console.error("Error fetching data from API:", error);
                    }};
              
                  fetchData(); // Call the fetch function
                }, []);
    
            
  // const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const graphConsumptions = await getGraphConsumptions();
  //       console.log(graphConsumptions);
        // Process the chart data
        // setChartData({
        //   labels: data.days, // Example: ['Day 1', 'Day 2', ...]
        //   datasets: [
        //     {
        //       label: 'Consumption per Day (kWh)',
        //       data: data.dailyConsumption, // Example: [120, 90, 100, ...]
        //       fill: false,
        //       borderColor: '#6a1b9a',
        //       tension: 0.1,
        //     },
        //   ],
        // });
  //     } catch (error) {
  //       console.error("Error fetching data from API:", error);
  //     }
  //   };

  //   fetchData(); // Call the fetch function
  // }, []); // Empty dependency array to run only once

  // const keyNumbers = [
  //   { title: 'Total Consumption', value: '1,245 kWh' },
  //   { title: 'Average Daily Consumption', value: '85 kWh' },
  //   { title: 'Peak Consumption', value: '150 kWh' }
  // ];

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
          <div key={index} className="card">
            <h3>{item.title}</h3>
            <p className="card-value">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Overview;
