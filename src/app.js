import express from "express";
import morgan from "morgan";
import path from "path"; // Importa el módulo path para manejar rutas de archivos
// Routes
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Routes
app.use("/api/", apiRoutes);

export default app;
