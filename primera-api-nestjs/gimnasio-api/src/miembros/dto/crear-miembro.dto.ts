import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CrearMiembroDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  membresia!: string;
}