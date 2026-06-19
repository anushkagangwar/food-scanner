export const detectFood = async (imageBase64) => {
  const res = await fetch("http://localhost:5000/detect-food", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageBase64 }),
  });

  return res.json();
};