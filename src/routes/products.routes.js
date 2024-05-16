import { Router } from "express";
import products from "../data/products.json" assert { type: "json" };
// middlewares
import { checkProductPut } from "../middleware/checkProductPut.middleware.js";
import { checkProductPost } from "../middleware/checkProductPost.middleware.js";
import { checkProductExists } from "../middleware/checkProductExists.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  const { limit } = req.query;

  const productToSend = limit ? products.slice(0, limit) : products;

  res.status(200).json({ status: "success", payload: productToSend });
});

router.get("/:id", checkProductExists, (req, res) => {
  const { id } = req.params;

  const findProduct = products.find((i) => i.id == id);

  res.status(200).json({ status: "success", payload: findProduct });
});

router.post("/", checkProductPost, (req, res) => {
  const product = req.body;

  // Preguntar acá por consigna
  if (product.status) {
    products.push(product);
  } else {
    products.push({ ...product, status: true });
  }

  res.status(200).json({ status: "success", payload: products });
});

router.put("/:id", checkProductExists, checkProductPut, (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  let productIndex = products.indexOf((i) => i.id == id);

  products[productIndex] = {
    ...products[productIndex],
    ...productData,
  };

  res
    .status(200)
    .json({ status: "success", payload: "Producto editado con éxito" });
});

router.delete("/:id", checkProductExists, (req, res) => {
  const { id } = req.params;

  let findProduct = products.find((i) => i.id == id);

  products = products.filter((i) => i.id != findProduct.id);

  res
    .status(200)
    .json({ status: "success", payload: "Producto eliminado con éxito" });
});

export default router;
