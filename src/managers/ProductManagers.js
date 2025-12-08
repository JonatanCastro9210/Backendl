import fs from "fs";

export default class ProductManagers {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const updated = products.filter(p => p.id !== parseInt(id));
        await fs.promises.writeFile(this.path, JSON.stringify(updated, null, 2));
        return updated;
    }
}