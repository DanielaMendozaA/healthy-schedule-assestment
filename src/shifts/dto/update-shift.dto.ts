import { IsEnum, IsOptional } from 'class-validator';
import { ShiftStatus } from 'src/enums/shitf-status';

export class UpdateStatusShiftDto {
    @IsEnum(ShiftStatus)
    @IsOptional()
    status: ShiftStatus
}
