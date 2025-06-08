import { useFinStore } from "../store/financesStore";
import DoughnutChart from "./Doughnut";
import BarGraph from "./Bar";  // Import BarGraph

const VisualizeChart = () => {
  const { finances } = useFinStore();

  const expenses = finances.filter(fin => fin.flowType === 'expense');
  const incomes = finances.filter(fin => fin.flowType === 'income');

  const groupByDescription = (data) => {
    const result = {};
    data.forEach(item => {
      result[item.description] = (result[item.description] || 0) + item.amount;
    });
    return result;
  };

  const getChartData = (groupedData) => ({
    labels: Object.keys(groupedData),
    datasets: [{
      data: Object.values(groupedData),
      backgroundColor: ['#4799eb', '#f9a8d4', '#a5f3fc', '#c084fc', '#facc15'],
      borderWidth: 1,
    }],
  });

  const incomeChartData = getChartData(groupByDescription(incomes));
  const expenseChartData = getChartData(groupByDescription(expenses));

  // Calculate total amounts
  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen p-6 flex flex-col md:flex-row items-center gap-8">
      <DoughnutChart title="Income Breakdown" chartData={incomeChartData} />
      <BarGraph title="Total Income vs Expenses" income={totalIncome} expenses={totalExpenses} />
      <DoughnutChart title="Expense Breakdown" chartData={expenseChartData} />
    </div>
  );
}

export default VisualizeChart;
