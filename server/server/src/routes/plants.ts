import { Router } from "express";
import { searchPlants, getPlantById } from "../controllers/plantsController";

const router = Router();

router.get("/", searchPlants);       // GET /api/plants?query=fern
router.get("/:id", getPlantById);    // GET /api/plants/p1

export default router;
