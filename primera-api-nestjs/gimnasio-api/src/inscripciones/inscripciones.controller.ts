import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UseFilters } from '@nestjs/common';
import type { Response } from 'express';
import { InscripcionesService } from './inscripciones.service.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import { ErroresDominioFilter } from './errores-http.filter.js';

@Controller('inscripciones')
@UseFilters(ErroresDominioFilter)
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Get()
  async listar() {
    const inscripciones = await this.inscripcionesService.listar();
    return inscripciones.map(aInscripcionDto);
  }

  @Post()
  async registrar(@Body() dto: CrearInscripcionDto, @Res({ passthrough: true }) res: Response) {
    const inscripcion = await this.inscripcionesService.registrar(dto);
    res.location(`/inscripciones/${inscripcion.id}`);
    res.status(201);
    return aInscripcionDto(inscripcion);
  }

  @Patch(':id/cancelar')
  async cancelar(@Param('id', ParseIntPipe) id: number) {
    const inscripcion = await this.inscripcionesService.cancelar(id);
    return inscripcion ? aInscripcionDto(inscripcion) : null;
  }
}