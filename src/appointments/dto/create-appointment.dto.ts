import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { AppointmentStatus } from "src/enums/appointment-status";

@ValidatorConstraint({ name: 'IsHourOClock', async: false })
class IsHourOClock implements ValidatorConstraintInterface {
    validate(date: Date): Promise<boolean> | boolean {
        const startTimeMinutes = date.getMinutes();
        console.log("------minutes--------", startTimeMinutes, date);
        return startTimeMinutes === 0

    }

    defaultMessage() {
        return "Starttime should be at o'clock hour";
    }

}

@ValidatorConstraint({ name: 'isFiftheenHoursBefore', async: false })
class isFiftheenHoursBefore implements ValidatorConstraintInterface {
    validate(date: Date): Promise<boolean> | boolean {

        const colombiaTime = formatInTimeZone(new Date(), 'America/Bogota', 'yyyy-MM-dd HH:mm:ssXXX');

        const colombiaTimePlus30minutes = addMinutes(colombiaTime, 30);

        const starTimeMiliSeconds = date.getTime();

        const reservationDatePlus15MiliSeconds = colombiaTimePlus30minutes.getTime();

        return reservationDatePlus15MiliSeconds < starTimeMiliSeconds

    }

    defaultMessage() {
        return 'Reservation can be done until 15 minutes before start time ';
    }
}


export class CreateAppointmentDto {


    @IsInt()
    @IsNotEmpty({ message: 'patientId is required' })
    patientId: number;

    @IsInt()
    @IsNotEmpty({ message: 'doctorId is required' })
    doctorId: number;

    @Validate(IsHourOClock)
    @Validate(isFiftheenHoursBefore)
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty({ message: 'date is required' })
    date: Date;

    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsEnum(AppointmentStatus)
    @IsOptional()
    status: AppointmentStatus



}
