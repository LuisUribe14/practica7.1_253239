import { Inject, Injectable } from '@nestjs/common';
import type { Miembro } from './dominio/entidades.js';
import type { MiembroRepository, NuevoMiembro } from './dominio/miembro.repository.js';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';

@Injectable()
export class MiembrosService {
    constructor(
        @Inject(MIEMBRO_REPOSITORY)
        private readonly repositorio: MiembroRepository,
    ) { }

    async listar(): Promise<Miembro[]> {
        return this.repositorio.listar();
    }

    async buscar(id: number): Promise<Miembro | null> {
        return this.repositorio.buscarPorId(id);
    }

    async crear(datos: NuevoMiembro): Promise<Miembro> {
        return this.repositorio.crear(datos);
    }

    async actualizar(id: number, datos: Partial<Miembro>): Promise<Miembro | null> {
        return this.repositorio.actualizar(id, datos);
    }

    async eliminar(id: number): Promise<boolean> {
        return this.repositorio.eliminar(id);
    }
}