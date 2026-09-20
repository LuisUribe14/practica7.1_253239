import type { Horario } from './entidades.js';

export type NuevoHorario = Omit<Horario, 'id'>;

export interface HorarioRepository {
  listar(): Promise<Horario[]>;
  buscarPorId(id: number): Promise<Horario | null>;
  crear(datos: NuevoHorario): Promise<Horario>;
  actualizar(id: number, datos: Partial<Horario>): Promise<Horario | null>;
  eliminar(id: number): Promise<boolean>;
}
