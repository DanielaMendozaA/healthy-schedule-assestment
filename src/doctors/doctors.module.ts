import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    AuthModule
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [
    TypeOrmModule,
    DoctorsService
  ]
})
export class DoctorsModule {}
