import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect,useState } from 'react';


import DataTable from 'react-data-table-component';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2';

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [estudiantes,setEstudiantes]=useState([]);


  const [formularioAgregar,SetAgregarEstudiantes]=useState({
      nombre: '',    
      apellido: ''
  });
  const [formularioEditar,SetEditarEstudiantes]=useState({
    nombre:'',
    apellido:'',
  });


//PARA ACTIVAR EL MODAL
  const [estudianteId,SetEstudianteId]=useState(null);
  const [busqueda,SetBusqueda]=useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [mostrar, setMostrar] = useState(false);
    const CerrarModal = () => setMostrar(false);
    const AbrirModal = () => setMostrar(true);
    
    const fetchEstudiantes = useCallback(async()=>{
      try{
        const respuesta =await fetch('http://localhost:3001/api/estudiante');
        const data = await respuesta.json();
        setEstudiantes(data);
      }catch(error){
        alert('ERROR REACT '+error);
      }
  },[]);
///llamar
useEffect(()=>{
  fetchEstudiantes();
},[fetchEstudiantes]);


//AGREGAR
const Agregar = async (e) => {
  e.preventDefault();

  const { nombre, apellido} = formularioAgregar;

  // Validación para asegurarnos de que todos los campos estén llenos
  if (!nombre.trim() || !apellido.trim() ) {
    alert('Por favor, ingresa nombre y apellido');
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:3001/api/estudiante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
     
      })
    });

    if (!respuesta.ok) {
      let errorMensaje = 'Error al crear el estudiante';
      try {
        const error = await respuesta.json();
        errorMensaje = error.message || errorMensaje;
      } catch (error) {
        console.error(errorMensaje);
      }
      throw new Error(errorMensaje);
    }

    // Si todo salió bien
    handleClose();  // Cerrar el modal
    Swal.fire({
      title: 'Estudiante creado correctamente',
      icon: 'success',
      timer: 2000
    });

    // Limpiar el formulario después de agregar el estudiante
    SetAgregarEstudiantes({
      nombre: '',
      apellido: '',
      nota: ''
    });

    fetchEstudiantes();  // Actualizar la lista de estudiantes

  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'No se pudo crear el estudiante',
      icon: 'error',
      timer: 2000
    });
  }
};



const cambiosFormularioAgregar = (e) => {
  const { name, value } = e.target;  // Obtén el 'name' y el 'value' del campo
  SetAgregarEstudiantes({
    ...formularioAgregar,
    [name]: value  // Actualiza la propiedad correspondiente en el estado
  });
};

const EditarEstudiantes=(estudiante)=>{
  SetEditarEstudiantes({
    nombre:estudiante.nombre,
    apellido:estudiante.apellido
  });
  SetEstudianteId(estudiante.id);
  AbrirModal();
}
const cambiosFormularioEditar=(e)=>{
  SetEditarEstudiantes({
    ...formularioEditar,
    [e.target.name]:e.target.value
  });
}
const EditarEstudiante=async(e)=>{
  e.preventDefault();
  if(!formularioEditar.nombre.trim()){
    alert('Nombre requerido');
    return;
  }
  try{
   const respuesta=await fetch(`http://localhost:3001/api/estudiante/${estudianteId}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        ...formularioEditar
      })
    });
    if(!respuesta.ok){
      let errorMensaje='Error al cargar';
      try{
        const error=await respuesta.json();
        errorMensaje=error.message || errorMensaje
      }catch(error){
        console.error(errorMensaje);
      }
      throw new Error(errorMensaje);
    }
    CerrarModal();
    Swal.fire({
      title: "!Se edito correctamente el estudiante!",
      icon: "success",
      draggable: true,
      timer:2000
    });
    fetchEstudiantes();

  }catch(error){
    console.error(error);
    Swal.fire({
      title: "!No se pudo editar el nuevo estudiante!",
      icon: "error",
      draggable: true,
      timer:2000
    });
  }
}
const EliminarEstudiante=async(id)=>{
Swal.fire({
  title: "¿Estas seguro de que deseas eliminar este registro?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "¡Si, Eliminar!"
}).then(async(result) => {
  if (result.isConfirmed) {
    try{
      await fetch(`http://localhost:3001/api/estudiante/${id}`,{
        method:`DELETE`
      });
      Swal.fire({
        title: "¡estudiante Eliminado Correctamente!",
        icon: "success",
        timer:2000
      });
      fetchEstudiantes();
    }catch(error){
      Swal.fire({
        title: "¡No se pudo eliminar el estudiante",
        icon: "success",
        timer:2000
      });
    }
    
  }
});
}
const columnas=[
{
  name:'ID',
  selector: row=>row.id,
  sortable:true
},
{
  name:'Apellido',
  selector:row=>row.apellido,
  sortable:true

},
{
  name:'Nombre',
  selector:row=>row.nombre,
  sortable:true
},


{
  name:'Acciones',
  cell:row=>(
    <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-warning"  onClick={()=>{EditarEstudiantes(row)}}><CiEdit /></button>
            <button type="button" className="btn btn-danger" onClick={()=>{EliminarEstudiante(row.id)}}><MdDeleteForever /></button>
    </div>
  )
}
];
const PaginacionOpciones={
 rowsPerPageText:'Filas por pagina'
};


  return (
    <div className="contenedor">
      <div className='padre'>
          <h1 className='hijo'>REGISTRO DE ESTUDIANTES</h1>
          <div style={{margin:'30px 0px'}}>
          <Button className='crear' variant="primary" onClick={handleShow}>Crear</Button>
          </div>
      </div>
     
      <div className='tabla'>

      
       <Form.Control
        style={{zIndex:10,position:'relative'}}//dar prioridad visual
        type='text'
        placeholder='Buscar Estudiante'
        className='mb-3'
        value={busqueda}
        onChange={(e)=>{SetBusqueda(e.target.value)}}
       />

       <DataTable
        columns={columnas}
        data={estudiantes.filter(estudiante=>{

          const nombre = estudiante.nombre || '';
          const apellido = estudiante.apellido || '';
          const termino = (busqueda || '').toLowerCase();
          return nombre.toLowerCase().includes(termino) || apellido.toLowerCase().includes(termino);

                })}
        pagination
        highlightOnHover
        striped
        paginationComponentOptions={PaginacionOpciones}
       />
    </div>

    {/*Modal para Agregar nuevo estudiante*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombre}
              />
            </Form.Group>
          </Form>
          {/*apellido*/}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido"
                name='apellido'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.apellido}
              />
            </Form.Group>
          </Form>
          

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Agregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal para Editar*/}
      <Modal show={mostrar} onHide={CerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group className="mb-3" controlId="formApellidoEditar">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el apellido"
                name="apellido"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.apellido}
              />
          </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombre}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarEstudiante}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      
    
    </div>
  );
}

export default App;