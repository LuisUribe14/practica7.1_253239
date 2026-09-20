import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MiembrosService } from './miembros.service.js';
import { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Get()
  async listar() {
    return this.miembrosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    return this.miembrosService.buscar(id);
  }

  @Post()
  async crear(@Body() dto: CrearMiembroDto) {
    return this.miembrosService.crear(dto);
  }

  @Patch(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarMiembroDto) {
    return this.miembrosService.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.miembrosService.eliminar(id);
  }
}