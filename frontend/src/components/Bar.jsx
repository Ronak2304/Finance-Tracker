import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ title, income, expenses }) => {
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenses],
        backgroundColor: ['#22c55e', '#ef4444'], // green for income, red for expenses
        borderRadius: 6,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `₹ ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // add currency format on y-axis ticks
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
  <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow">
    <h2 className="text-center text-lg font-semibold mb-4">{title}</h2>
    <Bar data={data} options={options} />
  </div>
);

};

export default BarGraph;
