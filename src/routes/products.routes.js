import { Router } from "express";
import { checkProductPut } from "../middleware/checkProductPut.middleware";
import { checkProductPost } from "../middleware/checkProductPost.middleware";
import { checkProductDelete } from "../middleware/checkProductDelete.middleware";
import { checkProductGet } from "../middleware/checkProductGet.middleware";
import products from "../data/products.json";

const router = Router();

router.get("/", (req, res) => {
  const { limit } = req.query;

  const productToSend = limit ? products.slice(0, limit) : products;

  res.status(200).json({ status: "success", payload: productToSend });
});

router.get("/:id", checkProductGet, (req, res) => {
  const { id } = req.params;

  const findProduct = products.map((i) => i.id == id);

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

router.put("/:id", checkProductPut, (req, res) => {
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

router.delete("/:id", checkProductDelete, (req, res) => {
  const { id } = req.params;

  let findProduct = products.find((i) => i.id == id);

  products = products.filter((i) => i.id != findProduct.id);

  res
    .status(200)
    .json({ status: "success", payload: "Producto eliminado con éxito" });
});

export default router;
