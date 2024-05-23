import express from "express";
import routes from "./routes/index.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
// Routes
app.use("/api", routes);
/* app.use("/static", express.static("public")); */

// Sockets

const httpServer = app.listen(8080, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

let products = [];

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("connected");

  socket.on("message", (data) => {
    console.log(data);
  });

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
