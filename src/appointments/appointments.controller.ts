import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  
  @Get('patients')
  findByPatientId(@Query() query: QueryDto) {
    const { patientId } = query;
    return this.appointmentsService.findByDoctorId(patientId);
  }

  @Get('doctors')
  findByDoctorId(@Query() query: QueryDto) {
    const { doctorId } = query;
    return this.appointmentsService.findByPatientId(doctorId);
  }
}
