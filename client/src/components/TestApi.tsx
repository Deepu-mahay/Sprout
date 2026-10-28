import { useEffect } from "react";
import { getPlants } from "../api/client";

function TestApi(){
    useEffect(()=>{
        const fetchPlants =async () => {
            try{
                const data = await getPlants();
                console.log(data);
            } catch(error) {
                console.error("API error:", error);
            }
        };
fetchPlants();
    },[]);
}
