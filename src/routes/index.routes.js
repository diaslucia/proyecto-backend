import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartRoutes from "./cart.routes.js";
import viewRoutes from "./views.routes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/cart", cartRoutes);
router.use("/views", viewRoutes);

export default router;
