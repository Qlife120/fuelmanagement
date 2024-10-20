import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Automatically register the required chart components
import '../styles/Chart.css';

function ConsumptionGraph({ consumptionData }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Extract the data to be used in the graph
    const dates = consumptionData.map(item => item.consumptionDate);
    const consumptionValues = consumptionData.map(item => item.consumption);

    // Prepare the chart data
    const data = {
      labels: dates, // X-axis labels (dates)
      datasets: [
        {
          label: 'Consumption over time',
          data: consumptionValues, // Y-axis data (consumption values)
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    setChartData(data);
  }, [consumptionData]);

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
    <div className='chart'>
      <h2>Graphe de Consommation</h2>
      <Line data={chartData} options={chartOptions}/>
    </div>
  );
}

export default ConsumptionGraph;
