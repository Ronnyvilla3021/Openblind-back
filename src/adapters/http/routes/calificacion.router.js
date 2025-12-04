const express = require('express');
const router = express.Router();
const { 
    mostrarCalificaciones, 
    crearCalificacion, 
    actualizarCalificacion, 
    eliminarCalificacion,
    obtenerCalificacion,
    obtenerPorTransporte,
    obtenerPorConductor,
    obtenerPorLugar,
    obtenerEstadisticas,
    obtenerRecientes
} = require('../../../application/controller/calificacion.controller');

router.get('/lista', mostrarCalificaciones);
router.get('/obtener/:id', obtenerCalificacion);
router.get('/transporte/:transporteId', obtenerPorTransporte);
router.get('/conductor/:conductorId', obtenerPorConductor);
router.get('/lugar/:lugarId', obtenerPorLugar);
router.get('/estadisticas', obtenerEstadisticas);
router.get('/recientes', obtenerRecientes);
router.post('/crear', crearCalificacion);
router.put('/actualizar/:id', actualizarCalificacion);
router.delete('/eliminar/:id', eliminarCalificacion);
module.exports = router;