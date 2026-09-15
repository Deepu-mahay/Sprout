import type { Request, Response } from "express";

// Example: proxying a third-party plant-database API.
// The real API key lives only in server/.env — it's never sent to the browser,
// because this code runs on your server, not in the client bundle.
const PLANT_API_KEY = process.env.PLANT_API_KEY;

export async function searchPlants(req: Request, res: Response) {
  const { query } = req.query;

  try {
    // Swap this for a real call, e.g.:
    // const response = await fetch(`https://some-plant-api.com/search?q=${query}&key=${PLANT_API_KEY}`);
    // const data = await response.json();

    // Placeholder response until you wire up a real provider:
    res.json({
      query,
      results: [{ id: "p1", name: "Boston Fern", scientificName: "Nephrolepis exaltata" }],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to search plants" });
  }
}

export async function getPlantById(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ id, name: "Boston Fern", scientificName: "Nephrolepis exaltata" });
}
