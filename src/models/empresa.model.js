const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombreEmpresa: String,
    idAdmin: { type: Schema.Types.ObjectId, ref: 'Usuarios' }


})

module.exports = mongoose.model('Empresas', empresaSchema);