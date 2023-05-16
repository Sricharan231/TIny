import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Histogram = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const labels = data.map(item => item.word);
    const frequencies = data.map(item => item.frequency);

    const chartConfig = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Word Frequency',
          data: frequencies,
          backgroundColor: '#3287a8',
          borderColor: 'white',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    };

    const chart = new Chart(chartRef.current, chartConfig);

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default Histogram;
