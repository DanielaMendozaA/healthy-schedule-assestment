import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalRecordDto {
    
    @IsInt()
    @IsNotEmpty({ message: 'doctorId is required' })
    doctorId: number;

    @IsInt()
    @IsNotEmpty({ message: 'patientId is required' })
    patientId: number;

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    recommendations: string


}
