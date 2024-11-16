import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateStatusShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    private readonly doctorsService: DoctorsService

  ) { }

  async create(createShiftDto: CreateShiftDto) {
    const doctor = await this.doctorsService.findOne(createShiftDto.doctorId)

    const existinShift = await this.shiftRepository.findOne({
      where: {
        dayShift: createShiftDto.dayShift,
        doctor: { id: doctor.id }
      },
      relations: ['doctor']

    })

    if (existinShift)
      throw new ConflictException("Doctor already has a shift for the choosen day")

    if (!doctor)
      throw new NotFoundException("Doctor not found")

    const newShift = {
      ...createShiftDto,
      doctor
    }

    const createdShift = this.shiftRepository.create(newShift)

    return await this.shiftRepository.save(createdShift);
  }

  async findAll() {
    return await this.shiftRepository.find();
  }

  async update(id: number, updateShiftDto: UpdateStatusShiftDto) {
    const shift = await this.shiftRepository.findOne({ where: { id } })
    if (!shift)
      throw new NotFoundException("Shift not found")

    const newShift = {
      ...shift,
      status: updateShiftDto.status
    }

    return await this.shiftRepository.save(newShift);
  }

  async findShiftByDoctorAndDay(doctorId: number, date: string, hour: string) {



    console.log(date);


    const existingShifts = await this.shiftRepository.find({
      where: {
        doctor: { id: doctorId },
      },
      relations: ['doctor']
    })

    const existingShift = existingShifts.find(shift => shift.dayShift.toString() === date)


    if (existingShift) {

      const selectedTime = hour.split('Z')[0];
      const [selectedHours, selectedMinutes] = selectedTime.split(':').map(Number);
      const selectedTotalMinutes = selectedHours * 60 + selectedMinutes;

      const [shiftStartHours, shiftStartMinutes] = existingShift.startTime.split(':').map(Number);
      const shiftStartTotalMinutes = shiftStartHours * 60 + shiftStartMinutes;

      const [shiftEndHours, shiftEndMinutes] = existingShift.endTime.split(':').map(Number);
      const shiftEndTotalMinutes = shiftEndHours * 60 + shiftEndMinutes;

      if (
        selectedTotalMinutes < shiftStartTotalMinutes ||
        selectedTotalMinutes > shiftEndTotalMinutes
      ) throw new ConflictException("There is not an appointment in the selected hour")
      

    }

    console.log("---desde aqui----", existingShifts, existingShift);


    return existingShift
  }

  


}
