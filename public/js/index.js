const socket = io();

const addForm = document.getElementById("addForm");
const removeForm = document.getElementById("removeForm");
const productsList = document.getElementById("productList");

// Agregar productos
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, price, description }),
  });

  addForm.reset();
});

// Sacar productos
removeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;

  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  removeForm.reset();
});

// Mostrar productos
socket.on("products", (data) => {
  productsList.innerHTML = "";

  data.forEach((prod, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<p><b>Title:</b> ${prod.title}</p> <p><b>Description:</b> ${prod.description}</p> <p><b>Price:</b> $${prod.price}</p>`;
    productsList.appendChild(card);
  });
});
