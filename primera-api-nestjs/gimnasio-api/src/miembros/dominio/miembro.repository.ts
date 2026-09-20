import type { Miembro } from './entidades.js';

export type NuevoMiembro = Omit<Miembro, 'id' | 'activo'>;

export interface MiembroRepository {
  listar(): Promise<Miembro[]>;
  buscarPorId(id: number): Promise<Miembro | null>;
  crear(datos: NuevoMiembro): Promise<Miembro>;
  actualizar(id: number, datos: Partial<Miembro>): Promise<Miembro | null>;
  eliminar(id: number): Promise<boolean>;
}