import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { detectFoodFromImage } from "../src/services/roboflow.js";
import { getNutritionData } from "../src/services/usda.js";
dotenv.config();

console.log(
  "ROBOFLOW_MODEL_URL:",
  process.env.ROBOFLOW_MODEL_URL
);

console.log(
  "USDA_API_KEY:",
  process.env.USDA_API_KEY
    ? process.env.USDA_API_KEY.slice(0, 5) + "..."
    : "undefined"
);

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send(
    "Backend Running Successfully 🚀"
  );
});

// =========================
// LOGIN API
// =========================
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password required",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: "demo-token-123",
      user: { email },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// FOOD DETECTION API
// =========================
app.post(
  "/detect-food",
  async (req, res) => {
    try {
      const { imageBase64 } = req.body;

      if (!imageBase64) {
        return res.status(400).json({
          error: "Image is required",
        });
      }

      console.log(
        "Image received successfully"
      );

      // Detect food using Roboflow
      const result =
        await detectFoodFromImage(
          imageBase64
        );

      console.log(
        "Detection Result:",
        result
      );

      if (
        !result ||
        !result.detectedFood
      ) {
        return res.status(400).json({
          error:
            "No food detected in image",
        });
      }

      const topFood =
        result.detectedFood;

      const confidence =
        result.confidence || 0;

      console.log(
        "Detected Food:",
        topFood
      );

      // Get nutrition from USDA
      const nutrition =
        await getNutritionData(
          topFood
        );

      console.log(
        "USDA Nutrition:",
        nutrition
      );

      return res.status(200).json({
        detectedFood:
          topFood,

        confidence,

        calories:
          nutrition?.calories || 0,

        protein:
          nutrition?.protein || 0,

        carbs:
          nutrition?.carbs || 0,

        fats:
          nutrition?.fats || 0,

        fiber:
          nutrition?.fiber || 0,
      });
    } catch (error) {
      console.log(
        "Food Detection Error:",
        error.response?.data ||
          error.message
      );

      return res.status(500).json({
        error:
          "Food analysis failed",
      });
    }
  }
);

// =========================
// TEST API
// =========================
app.get("/api/test", (req, res) => {
  res.json({
    message:
      "Frontend connected successfully 🚀",
  });
});

// =========================
// START SERVER
// =========================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} 🚀`
  );
});