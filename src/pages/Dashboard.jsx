import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Upload from "../components/Upload";
import Loader from "../components/Loader";
import Result from "../components/Result";

// ✅ FIXED IMPORT
import { detectFood } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // =========================
  // AUTH CHECK
  // =========================
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  // =========================
  // SCAN FOOD
  // =========================
  const scanFood = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    try {
      setLoading(true);
      setFoods([]);
      setResult(null);

      console.log("Sending Image:", file);

      // ✅ CALL BACKEND
      const data = await detectFood(file);

      console.log("AI Result:", data);

      // =========================
      // DETECTED FOOD
      // =========================
      setFoods([
        {
          name: data.detectedFood,
          value: data.confidence,
        },
      ]);

      // =========================
      // RESULT
      // =========================
      setResult({
        food: data.detectedFood,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats,
        fiber: data.fiber,
      });

      // =========================
      // HISTORY
      // =========================
      setHistory((prev) => [data.detectedFood, ...prev]);

    } catch (error) {
      console.error("Scan Error:", error);
      alert("Something went wrong while scanning!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Food Scanner Dashboard</h2>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* UPLOAD */}
      <Upload setFile={setFile} />

      {/* IMAGE PREVIEW */}
      {file && (
        <div className="card">
          <img
            src={file}
            alt="preview"
            style={{
              width: "100%",
              maxWidth: 300,
              borderRadius: 10,
            }}
          />
        </div>
      )}

      {/* SCAN BUTTON */}
      {file && (
        <button
          onClick={scanFood}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? "🔄 Scanning..." : "🚀 Scan Food"}
        </button>
      )}

      {/* LOADER */}
      {loading && <Loader />}

      {/* DETECTED FOOD */}
      {foods.length > 0 && (
        <div className="card">
          <h3>Detected Foods</h3>

          {foods.map((food, index) => (
            <p key={index}>
              🍽️ {food.name} (
              {(food.value * 100).toFixed(2)}%)
            </p>
          ))}
        </div>
      )}

      {/* RESULT */}
      {result && <Result data={result} />}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="card">
          <h3>Recent Scans</h3>

          {history.map((item, index) => (
            <p key={index}>📌 {item}</p>
          ))}
        </div>
      )}
    </div>
  );
}