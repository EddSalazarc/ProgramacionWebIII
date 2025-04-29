import * as Estudiante from '../model/EstudianteModel.js';


export const obtenerEstudiante=async(req,res)=>{
    try{
        const estudiantes= await Estudiante.obtenerTodosLosEstudiantes();
        res.status(200).json(estudiantes);
    }catch(error){
        res.status(500).json({message:'error al obtener los estudiante',error:error.message});
    }
}

export const crearEstudiante = async (req, res) => {
    try {
      // Extraer los datos del cuerpo de la solicitud
      //const { nombre, apellido} = req.body;
      const { nombre, apellido} = req.body;
      if (!nombre ) {
        return res.status(400).json({ message: 'Faltan datos, por favor complete todos los campos.' });
      }
  
      const newEstudiante = await Estudiante.crearNuevoEstudiante(nombre, apellido);
  
      res.status(201).json({ id: newEstudiante.id, message: 'Estudiante creado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el Estudiante', error: error.message });
    }
  };




export const eliminarEstudiante=async(req,res)=>{
    try{
        const{id}=req.params;
        const buscar=await Estudiante.buscarEstudiante(id);
        if(!buscar) return res.status(404).json({message:'Estudiante no encontrado'});
        await Estudiante.eliminarEstudiante(id);
        res.status(200).json({message:'Estudiante eliminado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error al eliminar el Estudiante',error:error.message});
    }
}
export const actualizarUnEstudiante=async(req,res)=>{
    try{
         const {id}=req.params;
         const buscar=await Estudiante.buscarEstudiante(id);
         if(!buscar) return res.status(404).json({message:'Estudiante no encontrado'})
        await Estudiante.actualizarEstudiante(id,req.body.nombre,req.body.apellido);
         res.status(200).json({message:'Estudiante actualizado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Erro al actualizar el Estudiante',error:error.message});
    }

}