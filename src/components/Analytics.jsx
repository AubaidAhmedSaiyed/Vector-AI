import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Analytics({ stock }) {
  const labels = stock.map(item => item.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales (Units)",
        data: stock.map(item => item.soldToday),
        backgroundColor: "rgba(99,102,241,0.7)",
      },
      {
        label: "Profit (₹)",
        data: stock.map(
          item => (item.price - item.cost) * item.soldToday
        ),
        backgroundColor: "rgba(16,185,129,0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default Analytics;
