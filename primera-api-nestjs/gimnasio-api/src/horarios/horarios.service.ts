import { Inject, Injectable } from '@nestjs/common';
import type { Horario } from './dominio/entidades.js';
import type { HorarioRepository, NuevoHorario } from './dominio/horario.repository.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';

@Injectable()
export class HorariosService {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly repositorio: HorarioRepository,
  ) {}

  async listar(): Promise<Horario[]> {
    return this.repositorio.listar();
  }

  async buscar(id: number): Promise<Horario | null> {
    return this.repositorio.buscarPorId(id);
  }

  async crear(datos: NuevoHorario): Promise<Horario> {
    return this.repositorio.crear(datos);
  }

  async actualizar(id: number, datos: Partial<Horario>): Promise<Horario | null> {
    return this.repositorio.actualizar(id, datos);
  }

  async eliminar(id: number): Promise<boolean> {
    return this.repositorio.eliminar(id);
  }
}