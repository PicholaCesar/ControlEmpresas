const express = require('express');
const controlEmpresas = require('../controllers/empresa.controller');


const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarempresa', [md_autenticacion.Auth, md_roles.verAdmin], controlEmpresas.agregarEmpresa);
api.put('/editarempresa/:idempresa', [md_autenticacion.Auth, md_roles.verAdmin], controlEmpresas.editarEmpresa);
api.delete('/eliminarempresa/:idempresa', [md_autenticacion.Auth, md_roles.verAdmin], controlEmpresas.eliminarEmpresa)

module.exports = api;