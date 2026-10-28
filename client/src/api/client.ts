import  axios from "axios";
 
const api = axios.create({
  baseURL: import.meta.env.PLANT_API_URL,
  headers:{
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.PLANT_API_KEY,
  },
});

export const getPlants = async () =>{
  try {
  const response = await api.get("/species-list");
  console.log(response.data)
  return response.data;
} catch(error) {
  console.error("Error fetching plants:", error);
  throw error;
}}