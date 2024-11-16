import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @Inject('IAuthService')
    private readonly authService: IAuthService

  ) { }

  async create({ email, password, name, speciality, phone }: CreateDoctorDto) {
    const newUser = {
      email,
      password,
      name,
      phone,
      role: UserRoleEnum.DOCTOR
    }

    const createdUser = await this.authService.register(newUser as CreateUserDto)

    console.log("user",createdUser);

    const newDoctor = {
      speciality,
      user: createdUser,
    }

    console.log("new doctor",newDoctor);

    const createdDoctor = this.doctorRepository.create(newDoctor)

    console.log("doctor",createdDoctor);
    
    return await this.doctorRepository.save(createdDoctor)
  }

  async findAll() {
    return await this.doctorRepository.find()
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({where: {id}})
    if(!doctor)
      throw new NotFoundException("Doctor not found")
    return doctor
  
  }

}
