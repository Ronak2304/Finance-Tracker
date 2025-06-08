import { useFinStore } from "../store/financesStore";
import DoughnutChart from "./Doughnut"


const VisualizeChart = () => {
    const {finances} = useFinStore()
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

    return (
        <div className="min-h-screen p-6 flex items-center gap-8">
            <DoughnutChart title="Income Breakdown" chartData={incomeChartData} />
            <DoughnutChart title="Expense Breakdown" chartData={expenseChartData} />
        </div>
    )
}

export default VisualizeChart