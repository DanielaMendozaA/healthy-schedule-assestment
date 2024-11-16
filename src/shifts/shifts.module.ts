import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift]),
    DoctorsModule
  ],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [
    TypeOrmModule,
    ShiftsService
  ]
})
export class ShiftsModule {}
