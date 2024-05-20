import { Router } from "express";
import { findFile, findById, writeFile } from "../utils/helpers.js";

// middlewares
import { checkCartPost } from "../middleware/checkCartPost.middleware.js";
import { checkCartExists } from "../middleware/checkCartExists.middleware.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";

const router = Router();
const cart = findFile("cart");

router.get("/:cId", checkCartExists, (req, res) => {
  const { cId } = req.params;

  const findCart = findById(cart, cId);

  res.status(200).json({ status: "success", payload: findCart });
});

router.post("/", checkCartPost, (req, res) => {
  const newCart = req.body;

  const newToPost = [
    ...cart,
    {
      ...newCart,
      id: generateUniqueId(),
    },
  ];
  writeFile("cart", newToPost);

  res.status(200).json({
    status: "success",
    message: "Cart added successfully",
    payload: newToPost,
  });
});

router.post("/:cId/product/:pId", checkCartExists, (req, res) => {
  const { cId, pId } = req.params;

  const findCart = findById(cart, cId);
  const findProductIndex = findCart.products.findIndex((i) => i.id == pId);

  if (findProductIndex !== -1) {
    findCart.products[findProductIndex].quantity += 1;
  } else {
    findCart.products.push({ id: pId, quantity: 1 });
  }
  writeFile("cart", [findCart]);

  res.status(200).json({
    status: "success",
    message: "Product added successfully",
    payload: findCart,
  });
});

export default router;
