import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(PORT, () => {
  console.log("🔥 SERVIDOR LEVANTADO EN PUERTO", PORT);
});