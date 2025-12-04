const express = require("express");
const router = express.Router();

// RUTA CORREGIDA: desde routes/ subir 3 niveles para llegar a application/controller/
const {mostrarMensaje} = require('../../../application/controller/index.controller')

router.get('/', mostrarMensaje)

module.exports = router