import { Router } from "express";
import {
  findFile,
  findById,
  writeFile,
  findByIndex,
} from "../utils/helpers.js";
// middlewares
import { checkProductPut } from "../middleware/checkProductPut.middleware.js";
import { checkProductPost } from "../middleware/checkProductPost.middleware.js";
import { checkProductExists } from "../middleware/checkProductExists.middleware.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";

const router = Router();
const products = findFile("products");

router.get("/", (req, res) => {
  const { limit } = req.query;

  const productToSend = limit ? products.slice(0, limit) : products;

  res.status(200).json({ status: "success", payload: productToSend });
});

router.get("/:id", checkProductExists, (req, res) => {
  const { id } = req.params;

  const findProduct = findById(products, id);

  res.status(200).json({ status: "success", payload: findProduct });
});

router.post("/", checkProductPost, (req, res) => {
  const product = req.body;

  // Status es true por default
  const newProducts = [
    ...products,
    { ...product, status: product.status || true, id: generateUniqueId() },
  ];

  writeFile("products", newProducts);

  res.status(200).json({
    status: "success",
    message: "Product added successfully",
    payload: newProducts,
  });
});

router.put("/:id", checkProductExists, checkProductPut, (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  const productIndex = findByIndex(products, id);
  const newProducts = products;
  newProducts[productIndex] = {
    ...newProducts[productIndex],
    ...productData,
  };
  writeFile("products", newProducts);

  res
    .status(200)
    .json({ status: "success", message: "Product edited successfully" });
});

router.delete("/:id", checkProductExists, (req, res) => {
  const { id } = req.params;

  const findProduct = findById(products, id);
  const newProducts = products.filter((i) => i.id != findProduct.id);
  writeFile("products", newProducts);

  res
    .status(200)
    .json({ status: "success", message: "Product deleted successfully" });
});

export default router;
