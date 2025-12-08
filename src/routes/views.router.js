import { Router } from "express";
import ProductManager from "../managers/ProductManagers.js";

const router = Router();
const productManager = new ProductManager("products.js");

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;
