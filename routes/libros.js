const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/LibrosController');

const controller = new LibrosController();

// GET endpoints
router.get('/', (req, res) => controller.listar(req, res));
router.get('/ultimos', (req, res) => controller.ultimosCinco(req, res));
router.get('/rango-fecha', (req, res) => controller.porRangoFecha(req, res));
router.get('/:id', (req, res) => controller.mostrarPorId(req, res));

// POST endpoint
router.post('/', (req, res) => controller.crear(req, res));

// PUT endpoint  
router.put('/:id', (req, res) => controller.actualizar(req, res));

// DELETE endpoint
router.delete('/:id', (req, res) => controller.eliminar(req, res));

module.exports = router;