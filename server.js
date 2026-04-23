require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Contacto = require("./models/Contacto");

app.use(cors());
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
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en http://127.0.0.1:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar MongoDB:", error.message);
  });