import { Doctor } from "src/doctors/entities/doctor.entity";
import { AppointmentStatus } from "src/enums/appointment-status";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, patient => patient.appointments)
    @JoinColumn({ name: 'patientId' })
    patient: Patient

    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor

    @Column('timestamp')
    date: Date;

    @Column('text')
    reason: Date;

    @Column({
        type: "enum",
        enum: ["active", "canceled", "completed"],
        default: "active"
    })
    speciality: AppointmentStatus



}
