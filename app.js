const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// Importar todas las rutas
const librosRouter = require('./routes/libros');
const autoresRouter = require('./routes/autores');
const usuariosRouter = require('./routes/usuarios');
const prestamosRouter = require('./routes/prestamos');

const app = express();

// Configurar EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Usar todas las rutas
app.use('/libros', librosRouter);
app.use('/autores', autoresRouter);
app.use('/usuarios', usuariosRouter);
app.use('/prestamos', prestamosRouter);

// Rutas para vistas
app.get('/', (req, res) => {
  res.render('index', { title: 'Sistema de Biblioteca' });
});

app.get('/libros/vista', (req, res) => {
  res.render('libros', { title: 'Gestión de Libros' });
});

app.get('/autores/vista', (req, res) => {
  res.render('autores', { title: 'Gestión de Autores' });
});

app.get('/usuarios/vista', (req, res) => {
  res.render('usuarios', { title: 'Gestión de Usuarios' });
});

app.get('/prestamos/vista', (req, res) => {
  res.render('prestamos', { title: 'Gestión de Préstamos' });
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en: http://localhost:${PORT}`);
});