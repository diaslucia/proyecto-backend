import { request, response } from "express";
import cart from "../data/cart.json" assert { type: "json" };

export const checkCartExists = (req = request, res = response, next) => {
  const { cId } = req.params;

  const findCart = cart.find((i) => i.id == cId);

  if (!findCart) {
    return res.status(400).json({
      status: "error",
      payload: "Carrito no encontrado",
    });
  }

  next();
};
