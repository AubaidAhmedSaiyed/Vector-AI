import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function InventoryBar({ stock }) {
  if (!stock || stock.length === 0) {
    return <div>No inventory data</div>;
  }

  // Top 5 products by quantity
  const topItems = [...stock]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const data = {
    labels: topItems.map(item => item.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: topItems.map(item => item.quantity),
        backgroundColor: "#06b6d4",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default InventoryBar;