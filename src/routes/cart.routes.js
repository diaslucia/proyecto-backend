import { Router } from "express";
import { checkCartPost } from "../middleware/checkCartPost.middleware";
import cart from "../data/products.json";

const router = Router();

router.get("/:id", checkCartGet, (req, res) => {
  const { id } = req.params;

  const findCart = cart.map((i) => i.id == id);

  res.status(200).json({ status: "success", payload: findCart });
});

router.post("/", checkCartPost, (req, res) => {
  const newCart = req.body;

  cart.push(newCart);

  res.status(200).json({ status: "success", payload: newCart });
});

export default router;
