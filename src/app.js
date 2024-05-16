import express from "express";
import routes from "./routes/index.routes.js";
import __dirname from "./dirname.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

// Routes

app.use("/api", routes);
app.use("/static", express.static("public"));

// req.params

app.get("/params/:id", (req, res) => {
  const { id } = req.params;

  res.send("El id es:", id);
});

// req.query

app.get("/queries", (req, res) => {
  const { nombre, apellido } = req.query;

  res.send("Estas son las queries que llegaron:", nombre, apellido);
});
