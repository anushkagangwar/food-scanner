import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result({ data }) {
  if (!data) return null;

  // ✅ FORCE NUMBER CONVERSION (IMPORTANT FIX)
  const protein = Number(data.protein || 0);
  const carbs = Number(data.carbs || 0);
  const fats = Number(data.fats || 0);
  const calories = Number(data.calories || 0);

  const chartData = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [protein, carbs, fats],
        backgroundColor: ["#22c55e", "#facc15", "#f43f5e"],
      },
    ],
  };

  return (
    <div className="card">
      <h2>Nutrition Breakdown</h2>

      {/* ✅ SAFE */}
      <p>Calories: {calories.toFixed(1)}</p>

      <Doughnut data={chartData} />

      <div style={{ marginTop: 10 }}>
        <p>Protein: {protein.toFixed(1)}g</p>
        <p>Carbs: {carbs.toFixed(1)}g</p>
        <p>Fats: {fats.toFixed(1)}g</p>
      </div>
    </div>
  );
}