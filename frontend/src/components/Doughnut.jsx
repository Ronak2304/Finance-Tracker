import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({title, chartData}) => {
    const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

    return (
        <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow">
            <h2 className="text-center text-lg font-semibold mb-4">{title}</h2>
            <Doughnut data={chartData} options={options} />
        </div>
    )
}

export default DoughnutChart