import axiosClient from './axiosClient';
import { Student, StudentFormData } from '../types';

/**
 * Todas las llamadas corresponden a las rutas del controlador de alumnos en el backend.
 * Puedes importar estas funciones en cualquier página o hook y trabajar con Promises tipadas.
 */

// ────────────────────────────────────────────────────────────────────────────────
// Lectura
// ────────────────────────────────────────────────────────────────────────────────

/** Obtiene sólo los alumnos activos */
export const getAlumnos = async (): Promise<Student[]> => {
  const { data } = await axiosClient.get<Student[]>('/alumnos');
  return data;
};

/** Obtiene TODOS los alumnos (activos e inactivos) – requiere rol admin */
export const getAllAlumnos = async (): Promise<Student[]> => {
  const { data } = await axiosClient.get<Student[]>('/alumnos/all');
  return data;
};

export const getAlumnoById = async (id: string): Promise<Student> => {
  const { data } = await axiosClient.get<Student>(`/alumnos/${id}`);
  return data;
};

export const searchAlumnos = async (query: string): Promise<Student[]> => {
  const { data } = await axiosClient.get<Student[]>('/alumnos/search', {
    params: { query },
  });
  return data;
};

// ────────────────────────────────────────────────────────────────────────────────
// Escritura
// ────────────────────────────────────────────────────────────────────────────────

export const createAlumno = async (
  form: StudentFormData & { Contrasena?: string }
): Promise<Student> => {
  const { data } = await axiosClient.post<Student>('/alumnos', form);
  return data;
};

export const updateAlumno = async (
  id: string,
  form: Partial<StudentFormData & { Contrasena?: string }>
): Promise<Student> => {
  const { data } = await axiosClient.put<Student>(`/alumnos/${id}`, form);
  return data;
};

export const softDeleteAlumno = async (id: string): Promise<void> => {
  await axiosClient.delete(`/alumnos/${id}`);
};

export const restoreAlumno = async (id: string): Promise<void> => {
  await axiosClient.post(`/alumnos/${id}/restore`);
};

// ────────────────────────────────────────────────────────────────────────────────
// Perfil propio (para el alumno autenticado)
// ────────────────────────────────────────────────────────────────────────────────

export const getMyProfile = async (id: string): Promise<Student> => {
  const { data } = await axiosClient.get<Student>(`/alumnos/profile/${id}`);
  return data;
};

export const updateMyProfile = async (
  id: string,
  form: Partial<StudentFormData & { Contrasena?: string }>
): Promise<Student> => {
  const { data } = await axiosClient.put<Student>(`/alumnos/profile/${id}`, form);
  return data;
};
