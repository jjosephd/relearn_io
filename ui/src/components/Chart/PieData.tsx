import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { pieData } from './data';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);
const PieData = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to true if you want to load the component only once
    threshold: 0.1, // Adjust based on when you want to trigger the visibility
  });
  const data: ChartData<'pie'> = {
    labels: [...pieData.labels],
    datasets: [pieData],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        position: 'bottom',
      },

      title: {
        display: true,
        text: 'Pie Cart Example',
        font: {
          size: 20,
        },
        position: 'bottom',
      },
    },
  };
  return (
    <>
      <div ref={ref} style={{ minHeight: '350px' }}>
        {inView && <Pie data={data} options={options} />}
      </div>
    </>
  );
};

export default PieData;
