import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import {
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
  CupoLlenoError,
  InscripcionDuplicadaError,
} from './dominio/errores.js';

@Catch(HorarioNoEncontradoError, MiembroNoEncontradoError, CupoLlenoError, InscripcionDuplicadaError)
export class ErroresDominioFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError) {
      res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
      return;
    }

    if (error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError) {
      res.status(HttpStatus.CONFLICT).json({ error: error.message });
      return;
    }
  }
}