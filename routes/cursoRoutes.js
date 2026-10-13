const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
router.get('/', cursoController.getAllCursos);
router.get('/:id', cursoController.getCursoById);
router.post('/', cursoController.createCurso);
router.put('/:id', cursoController.actualizarCurso);
router.delete('/:id', cursoController.eliminarCurso);
module.exports = router;
