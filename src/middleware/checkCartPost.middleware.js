import { request, response } from "express";

export const checkCartPost = (req = request, res = response, next) => {
  const { products } = req.body;
  const errors = [];

  if (!products) {
    errors.push("El campo 'products' es obligatorio.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      payload: errors,
    });
  }

  next();
};
