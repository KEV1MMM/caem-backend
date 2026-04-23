require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Contacto = require("./models/Contacto");

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend CAEM funcionando");
});

app.post("/api/contacto", async (req, res) => {
  try {
    const nuevoContacto = new Contacto(req.body);
    await nuevoContacto.save();

    res.status(201).json({
      mensaje: "Datos guardados correctamente",
      data: nuevoContacto
    });
  } catch (error) {
    console.error("Error al guardar contacto:", error.message);
    res.status(500).json({
      error: "Error al guardar datos",
      detalle: error.message
    });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB conectado");

    const PORT = process.env.PORT || 10000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar MongoDB:", error.message);
  });