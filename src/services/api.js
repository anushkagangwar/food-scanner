export const detectFood = async (imageBase64) => {
  const res = await fetch(
    "https://food-scanner-i9uy.onrender.com/detect-food",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64 }),
    }
  );

  return res.json();
};