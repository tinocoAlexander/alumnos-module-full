import { Router } from 'express';
import {
  obtenerAlumnos,
  obtenerTodos,
  crearAlumno,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno,
  restaurarAlumno,
  buscarAlumnos,
  verPerfil,
  actualizarPerfil,
} from '../controllers/alumno.controller';

const router = Router();

// Obtener solo alumnos activos
router.get('/', obtenerAlumnos);

// Obtener todos (incluidos inactivos) — solo para admin
router.get('/todos', obtenerTodos);

// Buscar alumnos por nombre o matrícula
router.get('/buscar', buscarAlumnos);

// Obtener alumno por ID
router.get('/:id', obtenerAlumnoPorId);

// Crear nuevo alumno
router.post('/', crearAlumno);

// Actualizar alumno (por ID)
router.put('/:id', actualizarAlumno);

// Eliminar (soft delete) alumno
router.delete('/:id', eliminarAlumno);

// Restaurar alumno inactivo
router.patch('/:id/restaurar', restaurarAlumno);

// Ver perfil de alumno
router.get('/:id/perfil', verPerfil);

// Actualizar perfil de alumno
router.put('/:id/perfil', actualizarPerfil);

export default router;
