import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/Chart.css';
import { addDays } from 'date-fns';

function ConsumptionGraph({ consumptionData }) {
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'Consommations par dates', data: [], borderColor: 'rgb(75, 192, 192)' }],
  });

  const generateDateRange = (startDate, endDate, step = 1) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, step);
    }
    return dates;
  };

  useEffect(() => {
    console.log(2);
    if (consumptionData && consumptionData.arrayConsumptions && consumptionData.startDate && consumptionData.endDate) {

    const { startDate, endDate, arrayConsumptions } = consumptionData;

// Step 1: Generate all dates as strings, merging with consumption dates
const availableDates = arrayConsumptions.map(item => item.consumptionDate);
const generatedDateStrings = generateDateRange(new Date(startDate), new Date(endDate), 1)
  .map(date => date.toISOString().split('T')[0]); // generate dates as strings
const allDateStringsSet = new Set([...availableDates, ...generatedDateStrings]);
const allDateStrings = Array.from(allDateStringsSet).sort(); // sorted unique date strings

// Step 2: Align consumptions with all dates
const availableConsumptions = arrayConsumptions.reduce((acc, item) => {
  acc[item.consumptionDate] = item.consumption;
  return acc;
}, {});

const alignedConsumptionData = allDateStrings.map(dateStr => availableConsumptions[dateStr] || 0);

// Step 3: Construct chart data with aligned data
const data = {
  labels: allDateStrings,
  datasets: [
    {
      label: 'Consommations par dates',
      data: alignedConsumptionData,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

    setChartData(data);}
  }, [consumptionData]);

  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Dates' } },
      y: { title: { display: true, text: 'Consommations' }, beginAtZero: true },
    },
  };
  console.log('graphe:',chartData);
  return (
    <div className='chart'>
      {/* <h2>Graphe de Consommation</h2> */}
      <Line data={chartData}  />
    </div>
  );
}

export default ConsumptionGraph;
