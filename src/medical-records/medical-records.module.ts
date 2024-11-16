import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports: [
    TypeOrmModule,
    MedicalRecordsService
  ]
})
export class MedicalRecordsModule {}
