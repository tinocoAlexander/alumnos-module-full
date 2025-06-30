import { Request, Response } from 'express';
import Alumno from '../models/Alumno';
import bcrypt from 'bcryptjs';

// Obtener todos los alumnos activos
export const obtenerAlumnos = async (_req: Request, res: Response) => {
  const alumnos = await Alumno.find({ activo: true });
  res.json(alumnos);
};

// Obtener todos los alumnos (incluyendo inactivos) — opcional para administradores
export const obtenerTodos = async (_req: Request, res: Response) => {
  const alumnos = await Alumno.find();
  res.json(alumnos);
};

// Buscar alumno por ID
export const obtenerAlumnoPorId = async (req: Request, res: Response) => {
  const alumno = await Alumno.findById(req.params.id);
  if (alumno) res.json(alumno);
  else res.status(404).json({ error: 'Alumno no encontrado' });
};

// Crear un nuevo alumno
export const crearAlumno = async (req: Request, res: Response) => {
  try {
    const { Contrasena, ...resto } = req.body;

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Contrasena, salt);

    const nuevoAlumno = new Alumno({
      ...resto,
      Contrasena: hash,
    });

    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear alumno', detalles: error });
  }
};

// Actualizar un alumno (por ID)
export const actualizarAlumno = async (req: Request, res: Response) => {
  try {
    const { Contrasena, ...resto } = req.body;
    let datosActualizados = { ...resto };

    if (Contrasena) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados = {
        ...resto,
        Contrasena: await bcrypt.hash(Contrasena, salt),
      };
    }

    const actualizado = await Alumno.findByIdAndUpdate(req.params.id, datosActualizados, { new: true });
    if (actualizado) res.json(actualizado);
    else res.status(404).json({ error: 'No se pudo actualizar' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar alumno' });
  }
};

// Eliminar un alumno (soft delete)
export const eliminarAlumno = async (req: Request, res: Response) => {
  const alumno = await Alumno.findById(req.params.id);

  if (!alumno) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  alumno.activo = false;
  await alumno.save();

  res.json({ mensaje: 'Alumno marcado como inactivo' });
};

// Restaurar alumno inactivo (opcional)
export const restaurarAlumno = async (req: Request, res: Response) => {
  const alumno = await Alumno.findById(req.params.id);

  if (!alumno) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  alumno.activo = true;
  await alumno.save();

  res.json({ mensaje: 'Alumno reactivado exitosamente' });
};

// Buscar alumnos por nombre o matrícula
export const buscarAlumnos = async (req: Request, res: Response) => {
  const { query } = req.query;

  const alumnos = await Alumno.find({
    activo: true,
    $or: [
      { nombre: { $regex: query, $options: 'i' } },
      { matricula: { $regex: query, $options: 'i' } },
    ],
  });

  res.json(alumnos);
};

// Ver perfil propio (para el alumno logueado)
export const verPerfil = async (req: Request, res: Response) => {
  const { id } = req.params;
  const alumno = await Alumno.findById(id);
  if (!alumno) return res.status(404).json({ error: 'Perfil no encontrado' });
  res.json(alumno);
};

// Actualizar perfil propio
export const actualizarPerfil = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Contrasena, ...otros } = req.body;
    let datosActualizados = { ...otros };

    if (Contrasena) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados.Contrasena = await bcrypt.hash(Contrasena, salt);
    }

    const actualizado = await Alumno.findByIdAndUpdate(id, datosActualizados, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};
