import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import path from "path";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("src", "public")));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve("src", "views"));

// Routes
app.use("/", viewsRouter);

// Server + WebSocket
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = new Server(httpServer);

const productManager = new ProductManager("products.json");

// Socket Events
io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    // Enviar productos actuales al conectarse
    const products = await productManager.getProducts();
    socket.emit("productList", products);

    // Crear producto
    socket.on("newProduct", async (data) => {
        await productManager.addProduct(data);
        const updatedProducts = await productManager.getProducts();
        io.emit("productList", updatedProducts);
    });

    // Eliminar producto
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getProducts();
        io.emit("productList", updatedProducts);
    });
});