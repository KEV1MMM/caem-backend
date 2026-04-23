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

app.get("/api/contacto", async (req, res) => {
    try {
      const contactos = await Contacto.find();
      res.json(contactos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener contactos" });
    }
  });

  app.put("/api/contacto/:id", async (req, res) => {
    try {
      const actualizado = await Contacto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json({
        mensaje: "Contacto actualizado",
        data: actualizado
      });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar" });
    }
  });

  app.delete("/api/contacto/:id", async (req, res) => {
    try {
      await Contacto.findByIdAndDelete(req.params.id);
  
      res.json({
        mensaje: "Contacto eliminado"
      });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar" });
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