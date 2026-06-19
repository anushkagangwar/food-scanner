import axios from "axios";

export const getNutritionData = async (
  foodName
) => {
  try {
    const response = await axios.get(
      "https://api.nal.usda.gov/fdc/v1/foods/search",
      {
        params: {
          query: foodName,
          api_key:
            process.env.USDA_API_KEY,
          pageSize: 1,
        },
      }
    );

    const food =
      response.data.foods?.[0];

    if (!food) {
      return {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
      };
    }

    const nutrients =
      food.foodNutrients || [];

    const getNutrient = (
      nutrientName
    ) => {
      const nutrient =
        nutrients.find(
          (n) =>
            n.nutrientName ===
            nutrientName
        );

      return nutrient?.value || 0;
    };

    return {
      calories:
        getNutrient("Energy"),
      protein:
        getNutrient("Protein"),
      carbs:
        getNutrient(
          "Carbohydrate, by difference"
        ),
      fats:
        getNutrient(
          "Total lipid (fat)"
        ),
      fiber:
        getNutrient(
          "Fiber, total dietary"
        ),
    };
  } catch (error) {
    console.log(
      "USDA Error:",
      error.response?.data ||
        error.message
    );

    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    };
  }
};