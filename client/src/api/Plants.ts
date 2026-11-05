import { useEffect, useState } from "react";
import { api } from "./api";

export default function Plants() {
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/plants/search", { params: { query: "fern" } })
      .then((res) => setPlants(res.data.results.data))
      .catch((err) => console.error(err));
  }, []);

  return (
 
    <ul>
      {plants.map((p) => (
        <li key={p.id}>{p.common_name}<li>
      ))}
    </ul>

  );
}