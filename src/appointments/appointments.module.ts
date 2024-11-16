import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ShiftsModule } from 'src/shifts/shifts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientsModule,
    DoctorsModule,
    ShiftsModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [
    TypeOrmModule,
    AppointmentsService
  ]
})
export class AppointmentsModule {}
