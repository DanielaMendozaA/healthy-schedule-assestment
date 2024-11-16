import { ConflictException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRecordRepository: Repository<Appointment>,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
    private readonly shiftsService: ShiftsService

  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorsService.findOne(createAppointmentDto.doctorId)

    if(!doctor)
      throw new NotFoundException("Doctor not found")

    const patient = await this.patientsService.findOne(createAppointmentDto.patientId)

    if(!patient)
      throw new NotFoundException("patient not found")

    await this.validateAvailability(createAppointmentDto.date, createAppointmentDto.doctorId)

    const newAppointment = {
      ...createAppointmentDto,
      doctor,
      patient
    }

    const createdAppointment = this.appointmentRecordRepository.create(newAppointment)
    return await this.appointmentRecordRepository.save(createdAppointment);
  }

  async findAll() {
    return await this.appointmentRecordRepository.find()
  }

  async validateAvailability(date: Date, doctorId: number, ) {
    const formattedDateUTC = date
    formattedDateUTC.setHours(formattedDateUTC.getHours() - 5);
    
    const formattedDate = formattedDateUTC.toISOString().split('T')
    
    console.log("Formatted UTC Date:", formattedDateUTC, typeof(formattedDateUTC),formattedDate );

    const existingDoctorShift = await this.shiftsService.findShiftByDoctorAndDay(doctorId, formattedDate[0], formattedDate[1] )

    console.log("existing shift", existingDoctorShift);


    if (!existingDoctorShift)
      throw new BadRequestException("There is not shift for the doctor in that day");

    const existingAppointments = await this.appointmentRecordRepository.find({
      where: {
        doctor: { id: doctorId },
      },
      relations: ['doctor']
    });

    const existingAppointment = existingAppointments.find(appointment =>   appointment.date.toISOString() === date.toISOString())
      

    if (existingAppointment) {
      throw new BadRequestException(
        "There is already an appointment scheduled for the doctor at this time"
      );
    }

  }

  
  async findByPatientId(id: number) {
    const patients = await this.appointmentRecordRepository.find({
      where: {
        patient: {id}
      },
      relations: ['patient']
    })
    return patients;
  }

  async findByDoctorId(id: number) {
    const doctors = await this.appointmentRecordRepository.find({
      where: {
        doctor: {id}
      },
      relations: ['doctor']
    })
    return doctors;
  }
}
