import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryDto {
  @IsOptional()
  @Type(() => Number) 
  @IsInt({ message: 'patientId must be an integer' })
  @Min(1, { message: 'patientId must be a positive integer' })
  patientId?: number;

  @IsOptional()
  @Type(() => Number) 
  @IsInt({ message: 'doctorId must be an integer' })
  @Min(1, { message: 'doctorId must be a positive integer' })
  doctorId?: number;
}
