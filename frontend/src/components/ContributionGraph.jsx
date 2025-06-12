import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format } from 'date-fns';
import { useFinStore } from '../store/financesStore';
import { useEffect } from 'react';

const ContributionGraph = () => {
  const { finances } = useFinStore();

  useEffect(() => {
    if (finances.length === 0) {
      console.log('No finances available to display contributions.');
    }
  }, [finances]);

  const contributions = [];
  const dateMap = {};

  finances.forEach((finance) => {
    const date = format(new Date(finance.createdAt), 'yyyy-MM-dd');
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  for (const date in dateMap) {
    contributions.push({ date, count: dateMap[date] });
  }

  const today = new Date();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Transaction Activity
      </h2>
      <CalendarHeatmap
        startDate={new Date(today.getFullYear(), 0, 1)}
        endDate={today}
        values={contributions}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          if (value.count >= 5) return 'color-blue-4';
          if (value.count >= 3) return 'color-blue-3';
          if (value.count >= 2) return 'color-blue-2';
          return 'color-blue-1';
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default ContributionGraph;