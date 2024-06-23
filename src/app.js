import express from "express";
import routes from "./routes/index.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { connectMongoDB } from "./dao/config/mongoDB.config.js";
import viewsRoutes from "./routes/views.routes.js";
import "dotenv/config";

const app = express();
const PORT = 8080;

// Mongo
connectMongoDB();
// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
// Routes
app.use("/api", routes);
app.use("/", viewsRoutes);

// Sockets
const httpServer = app.listen(8080, () => {
  console.log(`Listening ${PORT} port`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New user conected");
});
