import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from "src/users/entities/user.entity";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Shift } from "src/shifts/entities/shift.entity";
import { MedicalRecord } from "src/medical-records/entities/medical-record.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory{
    constructor(private readonly configService: ConfigService){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
            synchronize: true,
            entities: [User, Doctor, Patient, Shift, MedicalRecord, Appointment]

        };  
    };
};