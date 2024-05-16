import { request, response } from "express";

export const checkProductPut = (req = request, res = response, next) => {
  const product = req.body;

  if (product.id) {
    return res.status(400).json({
      status: "error",
      payload: "No puedes modificar el ID",
    });
  }

  next();
};
