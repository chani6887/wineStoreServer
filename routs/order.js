import express from "express";
import * as orderController from "../controuller/order.js";
import { auth,authAdmin } from "../middlewares/auth.js";
const router = express.Router();

router.get("/",authAdmin,orderController.getAllOrderes)
router.post("/",auth,orderController.addOrder)
router.delete("/:id",auth,orderController.deleteOrder)
router.get("/:id", auth,orderController.getOrderById)
router.put("/:id",authAdmin,orderController.updateOrder)

export default router;