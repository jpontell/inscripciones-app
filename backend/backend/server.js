const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Obtener inscritos
app.get("/inscritos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM inscritos ORDER BY fecha");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registrar inscripción
app.post("/inscribir", async (req, res) => {
  const { rut, bloque } = req.body;
  if (!rut || !bloque) return res.status(400).json({ error: "RUT y Bloque son requeridos" });

  try {
    const exist = await db.query("SELECT * FROM inscritos WHERE rut = $1", [rut]);
    if (exist.rows.length > 0) return res.status(400).json({ error: "Este RUT ya está inscrito" });

    const count = await db.query("SELECT COUNT(*) FROM inscritos WHERE bloque = $1", [bloque]);
    if (parseInt(count.rows[0].count) >= 15) return res.status(400).json({ error: `${bloque} lleno` });

    await db.query("INSERT INTO inscritos (rut, bloque) VALUES ($1, $2)", [rut, bloque]);
    res.json({ message: "Inscripción exitosa" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo...");
});
