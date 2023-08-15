import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: "*", // Permitir todas las solicitudes
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

app.use(express.static("public"));
app.use("/api/", apiRoutes);

export default app;
