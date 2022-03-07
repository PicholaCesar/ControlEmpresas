const empresa = require('../models/empresa.model');

function agregarEmpresa(req, res){

    const parametros = req.body;
    const modeloEmpresa = new empresa();

    if(parametros.nombreEmpresa){

        modeloEmpresa.nombreEmpresa = parametros.nombreEmpresa;
        modeloEmpresa.idAdmin = req.user.sub;

        modeloEmpresa.save((err, empresaGuardad) =>{

            if(err) return res.status(400).send({mensaje: "erro en la peticion"})
            if(!empresaGuardad) return res.status(400).send({mensaje:"erro al agregar empresa"})

            return res.status(200).send({empresa: empresaGuardad});
        })

    }else{
        return res.status(400).send({mensaje: 'Tienes que ingresar el parametro nombreEmpresa'});
    }

}


function editarEmpresa(req, res){
    var idempresa = req.params.idempresa;
    var parametros = req.body;
 
    delete parametros.password;
    delete parametros.rol;
 
    empresa.findByIdAndUpdate(idempresa, parametros, {new: true}, (err, AlumnoEditado) =>{
   
         if(err) return res.status(500).send({ mensaje: "error en la petcion"})
         if(!AlumnoEditado) return res.status(500). send({mensaje: "erro al editar la empresa"});
 
         return res.status(200).send({ usuario: empresaEditado})
     })

}

function eliminarEmpresa(req, res){

    var idEmpresa = req.params.idempresa;

    empresa.findByIdAndDelete(idEmpresa, (err, empresaEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "error en la peticion"});
        if(!empresaEliminada) return res.status(400).send({mensaje: "erro al eliminar la empresa"});

        return res.status(200).send({empresa: empresaEliminada})
    })

}






module.exports ={
    agregarEmpresa,
    editarEmpresa,
    eliminarEmpresa

}