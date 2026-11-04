
import "dotenv/config";
import type { Request, Response } from "express";


const PLANT_API_KEY = process.env.PLANT_API_KEY;

export async function searchPlants(req: Request, res: Response) {
  const  query  = String(req.query.query ?? "");

  if (!query){
    return res.status(400).json({error: "Missing ? query = parameter"})
  }

  const apiKey = process.env.PLANT_API_KEY;
  if( !apiKey){
    console.error("PLANT_API_KEY is not set");
    return res.status(500).json({error:"Server misconfigured"})

  }



  try {
    const url = `https://perenual.com/api/species-list?key=${apiKey}&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if(!response.ok){
      const text = await response.text();
      console.error("plant Api error:", response.status, text);
      return res.status(response.status).json({error:"Plant API request failed" });
    }


    const data = await response.json();

   console.log("Plant API result:", JSON.stringify(data, null, 2));

   res.json({query, results: data })
  } catch (err) {
    console.error("searchPlants failed:", err);
    res.status(500).json({ error: "Failed to search plants" });
  }
}

export async function getPlantById(req: Request, res: Response) {
  const { id } = req.params;
  
  
  if(!/^\d+$/.test(id)) {
    return res.status(400).json({error:"Invalid plant Id"});
  }

const apikey = process.env.PLANT_API_KEY;
if(!apikey){
  return res.status(500).json({error:"Server misconfigured"})
}

  try{
    const url  = `https://perenual.com/api/species/details/${id}?key=${apikey}`;
    const response = await fetch(url);

    if(!response.ok){
      const text  = await response.text();
      console.error("plant details error:", response.status, text);
      return res.status(response.status).json({error: "Failed to fetch plant details"});
    }

    const data = await response.json();
    console.log("Plant details:", data);
    res.json(data); 
    
  } catch(err){
    console.error("getPlantById failed:", err);
    res.status(500).json({error:"Failed to fetch plant"})
  }


}

