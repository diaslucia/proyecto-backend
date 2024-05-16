import express from "express";
import routes from "./routes/index.routes.js";

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
