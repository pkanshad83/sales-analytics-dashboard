import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ chartData }) => {
  if (!chartData || !chartData.months || chartData.months.length === 0) {
    return (
      <div className="no-chart-data">
        <p>Upload data to see revenue chart</p>
      </div>
    );
  }

  const data = {
    labels: chartData.months,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: chartData.revenues,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="revenue-chart">
      <h3>Revenue Analytics</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>

      <style jsx>{`
        .revenue-chart {
          margin-top: 30px;
        }
        
        .chart-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .no-chart-data {
          padding: 20px;
          text-align: center;
          color: #6c757d;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default RevenueChart;
