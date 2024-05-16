import { Router } from "express";
import cart from "../data/products.json" assert { type: "json" };
// middlewares
import { checkCartPost } from "../middleware/checkCartPost.middleware.js";
import { checkCartExists } from "../middleware/checkCartExists.middleware.js";

const router = Router();

router.get("/:id", checkCartExists, (req, res) => {
  const { id } = req.params;

  const findCart = cart.find((i) => i.id == id);

  res.status(200).json({ status: "success", payload: findCart });
});

router.post("/", checkCartPost, (req, res) => {
  const newCart = req.body;

  cart.push(newCart);

  res.status(200).json({ status: "success", payload: newCart });
});

router.post("/:cId/product/:pId", checkCartExists, (req, res) => {
  const { cId, pId } = req.body;

  const findCart = cart.find((i) => i.id == cId);
  const findProductIndex = findCart.products.findIndex((i) => i.id == pId);

  if (findProductIndex !== -1) {
    findCart.products[findProductIndex].quantity += 1;
  } else {
    findCart.products.push({ id: pId, quantity: 1 });
  }

  res.status(200).json({ status: "success", payload: newCart });
});

export default router;
