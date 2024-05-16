import { request, response } from "express";
import { products } from "../routes/products.routes";

export const checkProductGet = (req = request, res = response, next) => {
  const { id } = req.params;

  const findProduct = products.map((i) => i.id == id);

  if (!findProduct) {
    return res.status(400).json({
      status: "error",
      payload: "Producto no encontrado",
    });
  }

  next();
};
