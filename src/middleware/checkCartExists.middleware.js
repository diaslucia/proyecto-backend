import { request, response } from "express";
import { findFile, findById } from "../utils/helpers.js";

export const checkCartExists = (req = request, res = response, next) => {
  const { cId } = req.params;

  const cart = findFile("cart");
  const findCart = findById(cart, cId);

  if (!findCart) {
    return res.status(400).json({
      status: "error",
      payload: "Carrito no encontrado",
    });
  }

  next();
};
