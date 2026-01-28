import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


function InventoryPie({ stock, theme = "dark" }) {
  const data = {
    labels: stock.map((item) => item.name),
    datasets: [
      {
        data: stock.map((item) => item.quantity),
        backgroundColor: [
          "rgba(6,182,212,0.85)",   // Cyan
          "rgba(99,102,241,0.85)",   // Indigo
        ],
        borderWidth: 0,
      },
    ],
  };

  const hasLight = theme === "light";
  const legendColor = hasLight ? "#0f172a" : "#e5e7eb";

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 MOST IMPORTANT FIX
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: legendColor,
          padding: 16,
          font: {
            family: "'Poppins', sans-serif",
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: hasLight ? "#ffffff" : "#0f172a",
        titleColor: hasLight ? "#0f172a" : "#f1f5f9",
        bodyColor: hasLight ? "#334155" : "#cbd5e1",
        borderColor: hasLight ? "#e2e8f0" : "rgba(255,255,255,0.1)",
        borderWidth: 1,
        titleFont: {
          family: "'Poppins', sans-serif",
        },
        bodyFont: {
          family: "'Baloo Bhai 2', cursive",
          size: 14,
        },
      },
    },
  };

  return (
    <>


      {/* 🔥 HEIGHT CONTROL */}
      <div style={{ height: "260px" }}>
        <Pie data={data} options={options} />
      </div>
    </>
  );
}

export default InventoryPie;
