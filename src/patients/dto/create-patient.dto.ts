import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreatePatientDto extends CreateUserDto {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    age: number

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    @IsPositive()
    weight: number

}
