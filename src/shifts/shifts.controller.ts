import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateStatusShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateStatusShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto);
  }

 
}
