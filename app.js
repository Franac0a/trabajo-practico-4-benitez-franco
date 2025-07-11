import express from 'express';
import dotenv from 'dotenv';
import CharacterRoutes from './src/routes/character.routes.js';
import { startDB } from './src/config/database.js';


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


app.use(express.json());
app.use("/api", CharacterRoutes);


app.use("/api", (req, res) => {
   return  res.status(404).json({ message: "Ruta no encontrada" });
});

startDB().then(() => {
    console.log("Servidor corriendo: ");
})

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    await startDB(); // inicia la conexión con la base de datos
});