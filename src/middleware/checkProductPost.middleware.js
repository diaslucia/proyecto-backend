import { request, response } from "express";

export const checkProductPost = (req = request, res = response, next) => {
  const { description, code, price, status, stock, category } = req.body;
  const errors = [];

  if (!description) {
    errors.push("El campo 'description' es obligatorio.");
  }
  if (!code) {
    errors.push("El campo 'code' es obligatorio.");
  }
  if (typeof price !== "number" || price <= 0) {
    errors.push("El campo 'price' debe ser un número positivo.");
  }
  if (typeof stock !== "number" || stock < 0) {
    errors.push("El campo 'stock' debe ser un número entero no negativo.");
  }
  if (!category) {
    errors.push("El campo 'category' es obligatorio.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      payload: errors,
    });
  }

  next();
};
