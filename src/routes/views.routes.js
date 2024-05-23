import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const person = {
    name: "Juan",
  };

  res.render("index", { styles: "styles.css" });
  res.render("index", person);
});

export default router;
