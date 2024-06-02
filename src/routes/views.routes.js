import { Router } from "express";
import { findFile, writeFile, findById } from "../utils/helpers.js";
import { io } from "../app.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await findFile("products");
    res.render("home", { styles: "styles.css", products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts", {
      styles: "styles.css",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const products = await findFile("products");
    const newProducts = [
      ...products,
      {
        title: title,
        price: price,
        description: description,
        id: generateUniqueId(),
      },
    ];
    writeFile("products", newProducts);
    io.emit("products", products);

    res.render("realTimeProducts", {
      styles: "styles.css",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    const products = await findFile("products");
    const findProduct = findById(products, id);
    const newProducts = products.filter((i) => i.id != findProduct.id);
    writeFile("products", newProducts);
    io.emit("products", products);

    res.render("realTimeProducts", {
      styles: "styles.css",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
