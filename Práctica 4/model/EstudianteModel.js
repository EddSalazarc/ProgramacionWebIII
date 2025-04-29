import pool from "../config/db.js";



export const obtenerTodosLosEstudiantes=async()=>{
  const [array]=await pool.query('SELECT * FROM estudiante');
  return array;
}


export const crearNuevoEstudiante = async (nombre, apellido) => {
    try {
      const [resultado] = await pool.query('INSERT INTO estudiante (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);
      return { id: resultado.insertId, nombre, apellido};
    } catch (error) {
      throw new Error('Error al crear el estudiante: ' + error.message);
    }
  };


export const actualizarEstudiante=async(id,nombre,apellido)=>{
    await pool.query('UPDATE estudiante SET nombre=?, apellido=? WHERE id=?',[nombre,apellido,id]);
}

export const buscarEstudiante=async(id)=>{
    const [array]=await pool.query('SELECT * FROM estudiante WHERE id=?',[id]);
    return array[0];
}

export const eliminarEstudiante=async(id)=>{
    await pool.query('DELETE FROM estudiante WHERE id=?',[id]);
}