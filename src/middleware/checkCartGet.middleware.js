import { request, response } from "express";
import { cart } from "../routes/cart.routes";

export const checkCartGet = (req = request, res = response, next) => {
  const { id } = req.params;

  const findCart = cart.map((i) => i.id == id);

  if (!findCart) {
    return res.status(400).json({
      status: "error",
      payload: "Producto no encontrado",
    });
  }

  next();
};
