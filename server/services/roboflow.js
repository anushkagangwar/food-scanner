import axios from "axios";

export const detectFoodFromImage = async (
  imageBase64
) => {
  try {
    // Remove base64 prefix
    const cleanBase64 = imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    console.log(
      "ROBOFLOW_MODEL_URL =",
      process.env.ROBOFLOW_MODEL_URL
    );

    console.log(
      "ROBOFLOW_API_KEY =",
      process.env.ROBOFLOW_API_KEY
        ? process.env.ROBOFLOW_API_KEY.slice(
            0,
            5
          ) + "..."
        : "undefined"
    );

    const url = `${process.env.ROBOFLOW_MODEL_URL}?api_key=${process.env.ROBOFLOW_API_KEY}`;

    console.log("Final URL =", url);

    const response = await axios({
      method: "POST",
      url: url,
      data: cleanBase64,
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      timeout: 30000,
    });

    console.log(
      "Roboflow Response:",
      response.data
    );

    const predictions =
      response.data.predictions;

    if (
      !predictions ||
      predictions.length === 0
    ) {
      throw new Error(
        "No food detected"
      );
    }

    const topPrediction =
      predictions[0];

    return {
      detectedFood:
        topPrediction.class ||
        topPrediction.label,

      confidence:
        topPrediction.confidence,
    };
  } catch (error) {
    console.log(
      "Roboflow Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};