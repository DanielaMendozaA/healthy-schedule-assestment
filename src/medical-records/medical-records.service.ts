import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService
  ) { }

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const patient = await this.patientsService.findOne(createMedicalRecordDto.patientId)
    
    if(!patient)
      throw new NotFoundException("Patient not found")

    const doctor = await this.doctorsService.findOne(createMedicalRecordDto.doctorId)
     
    if(!doctor)
      throw new NotFoundException("Doctor not found")

    const newMedicalRecord = {
      ...createMedicalRecordDto,
      doctor,
      patient
    }

    const createdMedicalRecord = this.medicalRecordRepository.create(newMedicalRecord)

    return await this.medicalRecordRepository.save(createdMedicalRecord)
  }

  async findAll() {
    return await this.medicalRecordRepository.find();
  }

  async findByPatientId(id: number) {
    const patients = await this.medicalRecordRepository.find({
      where: {
        patient: {id}
      },
      relations: ['patient']
    })
    return patients;
  }

  async findByDoctorId(id: number) {
    const doctors = await this.medicalRecordRepository.find({
      where: {
        doctor: {id}
      },
      relations: ['doctor']
    })
    return doctors;
  }

}
