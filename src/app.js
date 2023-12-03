// app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api.routes.js';
import { authenticateToken, authHeaderMiddleware } from './auth/authMiddleware.js';
import jwt from 'jsonwebtoken';
import path from 'path';
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authHeaderMiddleware);
// Configuración de CORS
app.use(cors({
    origin: '*', // Permitir todas las solicitudes
    methods: 'GET',
    credentials: true,
}
,{
    origin: '*', // Permitir todas las solicitudes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use("/api/", apiRoutes);
app.get('/login.html', (req, res) => {
    res.sendfile('public/login.html');
  });

  app.post('/login.html', (req, res) => {
    const { username, password } = req.body;

    // Lógica de autenticación
    if (username === 'kingly' && password === 'Bulgaria111') {
        const token = jwt.sign({ username }, 'tu_clave_secreta', { expiresIn: '1h' });

        res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
        res.redirect('/')
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});
app.use(authenticateToken);

app.use(express.static('public'));
// Ruta de inicio de sesión





// Rutas protegidas
// app.use('/api/en/', apiRoutes);

export default app;
