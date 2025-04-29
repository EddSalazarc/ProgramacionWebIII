import{Router} from 'express';
import { obtenerEstudiante,crearEstudiante,actualizarUnEstudiante,eliminarEstudiante} from '../controller/EstudianteController.js';

const router=Router();

router.get('/estudiante',obtenerEstudiante);
router.post('/estudiante',crearEstudiante);
router.put('/estudiante/:id',actualizarUnEstudiante);
router.delete('/estudiante/:id',eliminarEstudiante);
export default router;
