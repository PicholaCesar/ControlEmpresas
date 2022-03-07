const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({
    nombreEmpleado: String,
    puesto: String,
    departamento: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresas' }


})

module.exports = mongoose.model('Empleados', empleadosSchema);