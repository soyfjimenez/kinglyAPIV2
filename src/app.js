import express from "express";
import morgan from "morgan";
// Routes
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", apiRoutes);

export default app;
