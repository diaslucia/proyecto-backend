import { request, response } from "express";
import products from "../data/products.json" assert { type: "json" };

export const checkProductExists = (req = request, res = response, next) => {
  const { id } = req.params;

  const findProduct = products.find((i) => i.id == id);

  if (!findProduct) {
    return res.status(400).json({
      status: "error",
      payload: "Producto no encontrado",
    });
  }

  next();
};
