import { request, response } from "express";
import { findFile, findById } from "../utils/helpers.js";

export const checkProductExists = (req = request, res = response, next) => {
  const { id } = req.params;

  const products = findFile("products");
  const findProduct = findById(products, id);

  if (!findProduct) {
    return res.status(400).json({
      status: "error",
      payload: "Producto no encontrado",
    });
  }

  next();
};
