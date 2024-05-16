import { request, response } from "express";
import { products } from "../routes/products.routes";

export const checkProductPut = (req = request, res = response, next) => {
  const { id } = req.params;
  const product = req.body;

  const findProduct = products.map((i) => i.id == id);

  if (!findProduct) {
    return res.status(400).json({
      status: "error",
      payload: "Producto no encontrado",
    });
  }

  if (product.id) {
    return res.status(400).json({
      status: "error",
      payload: "No puedes modificar el ID",
    });
  }

  next();
};
