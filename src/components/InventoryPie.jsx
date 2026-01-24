import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function InventoryPie({ stock }) {
  const data = {
    labels: stock.map((item) => item.name),
    datasets: [
      {
        data: stock.map((item) => item.quantity),
        backgroundColor: [
          "rgba(94,234,212,0.85)",   // aqua
          "rgba(99,102,241,0.85)",   // indigo
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 MOST IMPORTANT FIX
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e5e7eb",
          padding: 16,
        },
      },
      tooltip: {
        enabled: true,
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
