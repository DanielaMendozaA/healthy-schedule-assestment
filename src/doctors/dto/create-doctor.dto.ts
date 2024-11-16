import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { DoctorSpeciality } from "src/enums/doctor-specialty";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateDoctorDto extends CreateUserDto{  
    @IsEnum(DoctorSpeciality)
    @IsOptional()
    speciality: DoctorSpeciality

}
