// ===== Tipos globales sincronizados con el modelo de Mongoose (Alumno) y el controlador =====
// Si cambias el modelo en el backend, ajusta SÓLO este archivo y los servicios; los componentes type‑safe
// del front se mantendrán consistentes.

/**
 * Representa a un alumno tal y como lo expone la API (`/api/alumnos`).
 * Coincide 1‑a‑1 con el schema de Mongoose.
 */
export interface Alumno {
  /** Id de Mongo */
  _id: string;
  matricula: string;
  nombre: string;
  APaterno: string;
  MPaterno: string;
  sexo: string; // Considera usar enum: 'M' | 'F' | 'O'
  Telefono: string;
  CorreoElectronico: string;
  PerfilFacebook?: string;
  Instagram?: string;
  TipoSangre?: string;
  /** Dirección */
  dCalle?: string;
  Numero?: number | string;
  Colonia?: string;
  CodigoPostal?: number | string;
  /** Contacto de emergencia */
  dNombreContacto?: string;
  TelefonoContacto?: string;
  /** URL de la foto de perfil almacenada en tu bucket o servidor */
  imagen?: string;
  /** Soft‑delete */
  activo: boolean;
}

// ============================ UI‑centric tipos auxiliares ============================
// Los componentes siguen necesitando un shape más "friendly" (por ejemplo, nombre completo ya unido).
// Aquí definimos adaptadores y DTOs para formularios. Usa estos en los forms y servicios del front.

export interface AlumnoDTO {
  id: string; // alias de _id
  matricula: string;
  nombreCompleto: string; // "nombre APaterno MPaterno"
  sexo: string;
  telefono: string;
  correo: string;
  avatar?: string; // alias de imagen
  activo: boolean;
}

/** Datos que recibe/entrega el formulario de Alta/Edición de alumnos */
export interface AlumnoFormData {
  matricula: string;
  nombre: string;
  APaterno: string;
  MPaterno: string;
  sexo: string;
  Telefono: string;
  CorreoElectronico: string;
  PerfilFacebook?: string;
  Instagram?: string;
  TipoSangre?: string;
  dCalle?: string;
  Numero?: number | string;
  Colonia?: string;
  CodigoPostal?: number | string;
  dNombreContacto?: string;
  TelefonoContacto?: string;
  Contrasena?: string; // Sólo al crear o cambiar contraseña
  imagen?: File | string; // File al subir o URL al editar
  activo?: boolean; // Admin únicamente
}

// ============================ Resto de tipos sin cambios relevantes ============================
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  parentId?: string;
}

export interface AuthContextType {
  alumno: AlumnoDTO | null;
  login: (matricula: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface SearchFilters {
  query: string;
  activo?: boolean;
}
