import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}