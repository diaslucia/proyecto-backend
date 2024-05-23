const socket = io();

socket.emit("message", "Hola es un mensaje");

/* socket.on("individual", (data) => {
  console.log(data);
});
socket.on("some", (data) => {
  console.log(data);
});
socket.on("everybody", (data) => {
  console.log(data);
});
 */

const form = document.getElementById("form");
const productsList = document.getElementById("productsList");

// Enviamos los productos
form.onsubmit = (e) => {
  e.preventDefault();
  const title = e.target.elements.title.value;
  socket.emit("product", title);
};

// Escuchamos la respuesta
socket.on("product", (data) => {
  productsList.innerHTML = "";

  data.forEach((prod, index) => {
    const div = document.createElement("div");
    div.className.add("card");
    div.innerHTML = `<p>Produto: ${prod.title}</p>`;
    productsList.append(div);

    const btn = document.createElement("button");
    btn.className.add("btn");
    btn.innerText = "Buy";
    btn.onclick = () => {
      data[index].stock--;
      socket.emit("updateStock", data);
    };
    div.append(btn);
  });
});
