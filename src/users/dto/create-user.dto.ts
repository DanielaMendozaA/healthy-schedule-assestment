import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserRoleEnum } from 'src/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*)/,
    { message: 'password - The password must have at least one upper case letter, one lower case letter, and one number' }
  )
  password: string;

  @IsString()
  phone: string;

  @IsEnum(UserRoleEnum)
  @IsOptional()
  role: UserRoleEnum



}

