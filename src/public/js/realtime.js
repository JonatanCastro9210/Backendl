const socket = io();

//lista UL
const productList = document.getElementById('productList');

// formulario
const form = document.getElementById('productForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        title: form.title.value,
        price: parseFloat(form.price.value)
    };

    socket.emit('newProduct', data);

    form.reset();
});

// actualizar lista
socket.on("productList", (products) => {
    productList.innerHTML = "";

    products.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `${p.title} - $${p.price}
        <button onclick="deleteProduct('${p.id})">Eliminar</button>`;
        productList.appendChild(li);
    });
});
function deleteProduct(id) {
    socket.emit("deletProduct" , id);
    }