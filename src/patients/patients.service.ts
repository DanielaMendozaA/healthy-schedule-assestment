import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @Inject('IAuthService')
    private readonly authService: IAuthService

  ) { }


  async create({ email, password, name, age, phone, weight }: CreatePatientDto) {
    const newUser = {
      email,
      password,
      name,
      phone
    }
    const createdUser = await this.authService.register(newUser as CreateUserDto)

    const newPatient = {
      age,
      weight,
      user: createdUser
    
    }

    const createdPatient = this.patientRepository.create(newPatient);
    return await this.patientRepository.save(createdPatient)
  }

  async findAll() {
    return await this.patientRepository.find();
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({where: {id}})
    if(!patient)
      throw new NotFoundException("Patient not found")
    return patient
  
  }

}
