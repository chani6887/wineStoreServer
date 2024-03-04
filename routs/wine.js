import { authAdmin } from "../middlewares/auth.js";
import express from "express";
import * as wineController from "../controuller/wine.js"
const router = express.Router();


router.get("/", wineController.getAllwines) 
router.get("/:id", wineController.getwineById)
router.delete("/:id",authAdmin, wineController.deletewine)
router.post("/",authAdmin, wineController.addwine)
router.put("/:wineid",authAdmin, wineController.updatewine)
router.get("/num/pages", productController.getNumOfPages);

export default router;
