
import { Doctor } from "src/doctors/entities/doctor.entity";
import { ShiftStatus } from "src/enums/shitf-status";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('shifts')
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, doctor => doctor.shifts)
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor

    @Column('date')
    dayShift: Date;

    @Column('text')
    startTime: string;

    @Column('text')
    endTime: string;

    @Column({
        type: "enum",
        enum: ["available", "busy"],
        default: "available"
    })
    status: ShiftStatus


}
