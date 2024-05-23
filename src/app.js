import express from "express";
import routes from "./routes/index.routes.js";
import __dirname from "./dirname.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = app.listen(8080, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

// Routes

app.use("/api", routes);
app.use("/static", express.static("public"));

// Sockets

let products = [];

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("connected");

  socket.on("product", (data) => {
    products.push(data);
    socketServer.broadcast.emit("allProducts", products);
  });

  socket.on("updateStock", (data) => {
    products = data;
    socketServer.broadcast.emit("allProducts", products);
  });

  /* socket.on("message", (data) => {
    console.log(data);
  });
  socket.emit("individual", "Este mensaje es individual");
  socket.broadcast.emit("some", "Mensaje para todos menos el socket actual");
  socket.emit("everybody", "Mensaje para todos"); */
});
