const BASE_URL = "http://localhost:8088/cities";

export const getCities = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

export const addCity = async (name) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return await response.json();
};

export const deleteCity = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
};