import { Inject, Injectable } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository.js';
import { INSCRIPCION_REPOSITORY } from './dominio/inscripcion.repository.js';
import type { NuevaInscripcion, Inscripcion } from './dominio/entidades.js';
import {
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
  CupoLlenoError,
  InscripcionDuplicadaError,
} from './dominio/errores.js';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repositorio: InscripcionRepository,
  ) {}

  async listar(): Promise<Inscripcion[]> {
    return this.repositorio.listar();
  }

  async registrar(datos: NuevaInscripcion): Promise<Inscripcion> {
    const horario = await this.repositorio.buscarHorario(datos.horarioId);
    if (!horario) {
      throw new HorarioNoEncontradoError(datos.horarioId);
    }

    const miembro = await this.repositorio.buscarMiembro(datos.miembroId);
    if (!miembro) {
      throw new MiembroNoEncontradoError(datos.miembroId);
    }

    const inscripcionesDelHorario = await this.repositorio.buscarPorHorario(datos.horarioId);
    const confirmadas = inscripcionesDelHorario.filter((i) => i.estado === 'confirmada');

    const yaInscrito = confirmadas.some((i) => i.miembroId === datos.miembroId);
    if (yaInscrito) {
      throw new InscripcionDuplicadaError(datos.horarioId, datos.miembroId);
    }

    if (confirmadas.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(datos.horarioId, horario.cupoMaximo);
    }

    return this.repositorio.guardar(datos);
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    return this.repositorio.cancelar(id);
  }
}