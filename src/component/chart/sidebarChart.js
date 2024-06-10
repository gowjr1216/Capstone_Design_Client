// import { style } from 'd3-selection';
import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, data2 }) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const containerWidth = chartRef.current.offsetWidth;
      const containerHeight = chartRef.current.offsetHeight;
      setContainerSize({ width: containerWidth, height: containerHeight });
    }
  }, []);

  const chartData = {
    labels: data2.map((_, index) => `${data2[index]}: ${index + 1}`),
    datasets: [
      {
        label: '실행중인 프로세스의 트래픽량',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div ref={chartRef} style={{ position: 'relative', height: '1000px', width: '100%' }}>
      {containerSize.width !== 0 && containerSize.height !== 0 && (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
