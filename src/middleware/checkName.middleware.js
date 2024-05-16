import { request, response } from "express";

export const checkName = (req = request, res = response, next) => {
  const { name } = req.body;

  if (!user.name)
    return res
      .status(400)
      .json({ status: "error", payload: "Enviar nombre de usuario" });

  next();
};
