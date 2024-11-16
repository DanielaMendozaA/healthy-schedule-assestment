import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    UsersModule,
    AuthModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [
    TypeOrmModule,
    PatientsService
  ]
})
export class PatientsModule {}
