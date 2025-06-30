import { Schema, model, Document } from 'mongoose';

export interface IAlumno extends Document {
  matricula: string;
  nombre: string;
  APaterno: string;
  MPaterno: string;
  sexo: string;
  Telefono: string;
  CorreoElectronico: string;
  PerfilFacebook: string;
  Instagram: string;
  TipoSangre: string;
  Contrasena: string;
  dCalle: string;
  Numero: number | string;
  Colonia: string;
  CodigoPostal: number | string;
  dNombreContacto: string;
  TelefonoContacto: string;
  imagen?: string;
  activo: boolean;
}

const alumnoSchema = new Schema<IAlumno>({
  matricula: { type: String, required: true, unique: true },
  nombre: String,
  APaterno: String,
  MPaterno: String,
  sexo: String,
  Telefono: String,
  CorreoElectronico: String,
  PerfilFacebook: String,
  Instagram: String,
  TipoSangre: String,
  Contrasena: String,
  dCalle: String,
  Numero: Schema.Types.Mixed,
  Colonia: String,
  CodigoPostal: Schema.Types.Mixed,
  dNombreContacto: String,
  TelefonoContacto: String,
  imagen: String,
  activo: { type: Boolean, default: true },
});


export default model<IAlumno>('Alumno', alumnoSchema);
