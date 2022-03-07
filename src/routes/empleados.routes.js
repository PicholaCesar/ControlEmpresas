const express = require('express');
const controlEmpleado = require('../controllers/Empleados.controller');


const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarempleado', [md_autenticacion.Auth, md_roles.verEmpresa] ,controlEmpleado.agregarEmpleados);
api.put('/editarempleado/:idempleado', [md_autenticacion.Auth, md_roles.verEmpresa], controlEmpleado.editarEmpleados);
api.delete('/eliminarempleado/:idempleado', [md_autenticacion.Auth, md_roles.verEmpresa], controlEmpleado.eliminarEmpleado);
api.get('/obtenerempleados', [md_autenticacion.Auth, md_roles.verEmpresa], controlEmpleado.obteberEmpleados);
api.get('/busquedanombreopuesto', controlEmpleado.BusquedaNombreOpuesto);
api.get('/buscarNombre', controlEmpleado.BusquedaNombre);
api.get('/buscarPorPuesto', controlEmpleado.buscarPorPuesto);
api.get('/buscarPorDepartamento', controlEmpleado.buscarPorDepartameto)


 

module.exports = api;