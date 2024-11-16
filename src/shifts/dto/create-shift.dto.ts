import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isBefore, subDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ShiftStatus } from "src/enums/shitf-status";

@ValidatorConstraint({ name: 'IsOneDayBefore', async: false })
class IsOneDayBefore implements ValidatorConstraintInterface {
  validate(dayShift: Date, args: ValidationArguments): boolean {
    if (!dayShift) {
      return false;
    }


    const now =  formatInTimeZone(new Date(), 'America/Bogota', 'yyyy-MM-dd HH:mm:ssXXX')
    const oneDayBeforeShift = subDays(dayShift, 1);

    return isBefore(now, oneDayBeforeShift);
  }

  defaultMessage() {
    return 'The shift must be scheduled at least one day in advance.';
  }
}

@ValidatorConstraint({ name: 'IsHourOClock', async: false })
class IsHourOClock implements ValidatorConstraintInterface {
    validate(time: string, args: ValidationArguments): Promise<boolean> | boolean {

        const dto = args.object as CreateShiftDto;

        const dayShift = dto.dayShift
        console.log("before sethours------", dayShift );
        if (!dto.dayShift || !time) {
            return false;
        }


        const [hours, minutes] = time.split(':').map(Number);

        dayShift.setHours(hours, minutes, 0, 0);

        console.log("sethours", dayShift );
        
        return  dayShift.getMinutes() === 0;

    }

    defaultMessage() {
        return "Starttime should be at o'clock hour";
    }

}


export class CreateShiftDto {
    @IsInt()
    @IsNotEmpty({ message: 'doctorId is required' })
    doctorId: number;

    @Validate(IsOneDayBefore)
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty({ message: 'day is required' })
    dayShift: Date;

    @Validate(IsHourOClock)
    @IsNotEmpty({ message: 'startTime  is required' })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
    startTime: string;

    @Validate(IsHourOClock)
    @IsNotEmpty({ message: 'endTime  is required' })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTimemust be in HH:mm format' })
    endTime: string;

    @IsEnum(ShiftStatus)
    @IsOptional()
    status: ShiftStatus
}
