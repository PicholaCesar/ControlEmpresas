const modEpleados = require('../models/empleados.model');
const pdfkit = require('pdfkit');
const fs = require('fs');
const xl = require('excel4node');


function obteberEmpleados(req, res){
    const pdfDocument = new pdfkit
    pdfDocument.pipe(fs.createWriteStream("empleados.pdf"));
    const wb = new xl.Workbook();
    var ws = wb.addWorksheet('empleados.xlsx');
 
    modEpleados.find({},(err, empleadoEncontrado) =>{
        if(err) return res.status(500).send({ mensaje: "error al obtener"});
        if(!empleadoEncontrado) return res.status(500).send({mensaje : "erro al obtener curso"});
        
                
        let contenido =[]
        for(let i = 0; i< empleadoEncontrado.length; i++){

            contenido.push(empleadoEncontrado[i].nombreEmpleado+'              '+ 
                           empleadoEncontrado[i].puesto+'              '+  
                           empleadoEncontrado[i].departamento+'         '+
                           empleadoEncontrado[i].idEmpresa+'\n'+'\n'+'\n')
        }

        pdfDocument.text("Empleados",{
            align: 'center',
        })

        pdfDocument.text("     ",{
            align: 'center',
        })

        pdfDocument.text("NOMBRE               PESTO             DEPARTAMENTO     ID_EMPRESA",{
            //align: 'center',
        })


        pdfDocument.text("-----------------------------------------------------------------------------------------------",{
            align: 'center',
        })

        pdfDocument.text(contenido,{
            align: 'center',
            fit: [250,300],           
      })

      ws.cell(1, 1).string(empleadoEncontrado);
      wb.write('Empleados.xlsx');

      pdfDocument.end()

        return res.status(200).send({ empleado: empleadoEncontrado})
               

    })//.populate('idEmpresa', 'nombreEmpresa')

  
}







function agregarEmpleados(req, res){
   
    var parametrosbody = req.body;
    var modeloEmpleado = new modEpleados();

    if (parametrosbody.nombreEmpleado && parametrosbody.puesto && parametrosbody.departamento ) {

        modeloEmpleado.nombreEmpleado = parametrosbody.nombreEmpleado;
        modeloEmpleado.puesto = parametrosbody.puesto;
        modeloEmpleado.departamento = parametrosbody.departamento;
        modeloEmpleado.idEmpresa = req.user.sub;
 
        modeloEmpleado.save((err, empleadoGuardado) =>{
            if(err) return res.status(400).send({ mesaje: "erro en la peticion"})
            if(!empleadoGuardado) return res.status(400).send({ mesaje: "erro al agregar empresa"})

            return res.status(200).send({ empleado: empleadoGuardado})
        })

    }else{

        return res.status(400).send({ mesaje: "Debe ingresar los parametros obligatorias"});
    }

}

function editarEmpleados(req, res){
    var idEmpleado = req.params.idempleado;
    var parametrosbody = req.body;

     modEpleados.findByIdAndUpdate(idEmpleado, parametrosbody, {new: true},(err, empleadoEditado)=>{
        if(err) return res.status(400).send({ mesaje: "erro en la peticion"})
        if(!empleadoEditado) return res.status(400).send({ mesaje: "erro al editar el empleado"});

        return res.status(200).send({empleado: empleadoEditado});
    })
    
}

function eliminarEmpleado(req, res){

    var idEmpleadoRuta = req.params.idempleado;

    modEpleados.findByIdAndDelete(idEmpleadoRuta, (err, empleadoEliminado)=>{

        if(err) return res.status(400).send({ mesaje: "erro en la peticion"});
        if(!empleadoEliminado) return res.status(400).send({ mesaje: "erro al eliminar empleado"})

        return res.status(200).send({ empleado: empleadoEliminado})

    })
}



function BusquedaNombreOpuesto(req, res) {
    var parametro = req.body;

    modEpleados.find( { $or: [
        {nombreEmpleado: { $regex: parametro.nombre, $options: "i" }},
        {puesto: { $regex: parametro.puesto, $options: "i" }} ]}, 
        (err, usuariosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obtener los usuarios'})

        return res.status(200).send({ usuarios: usuariosEncontrados })
    })
}

function BusquedaNombre(req, res) {
    var parametrosbody = req.body;

    modEpleados.find({ nombreEmpleado: {$regex: parametrosbody.nombre, $options: "i" } }, (err, empleadoEmcontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!empleadoEmcontrado) return res.status(500)
            .send({ mensaje: 'Error al obtener los datos'})

        return res.status(200).send({ Empleado: empleadoEmcontrado })
    })
}

function buscarPorPuesto(req, res){
    var parametrosbody = req.body;

    modEpleados.find({ puesto: {$regex: parametrosbody.puesto, $options: "i" }}, (err, puestoEncontrado) =>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!puestoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener los datos'})

        return res.status(200).send({ empleado: puestoEncontrado })
    })

}

function buscarPorDepartameto(req,res){
    var parametrosbody = req.body;

    modEpleados.find({departamento: {$regex: parametrosbody.departamento, $options: "i" }}, (err, departametoEncotrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'})
        if(!departametoEncotrado) return res.status(500).send({ mensaje:"erro al obtener los datos"})

        return res.status(200).send({ Departamento: departametoEncotrado })
    })
}

module.exports = {
    agregarEmpleados,
    editarEmpleados,
    eliminarEmpleado,
    obteberEmpleados,
    BusquedaNombreOpuesto,
    BusquedaNombre,
    buscarPorPuesto,
    buscarPorDepartameto
}