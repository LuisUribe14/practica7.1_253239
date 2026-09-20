import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HorariosService } from './horarios.service.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Get()
  async listar() {
    return this.horariosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.buscar(id);
  }

  @Post()
  async crear(@Body() dto: CrearHorarioDto) {
    return this.horariosService.crear(dto);
  }

  @Patch(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarHorarioDto) {
    return this.horariosService.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.horariosService.eliminar(id);
  }
}