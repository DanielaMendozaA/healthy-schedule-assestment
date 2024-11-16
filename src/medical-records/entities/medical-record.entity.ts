import { Doctor } from "src/doctors/entities/doctor.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical-records')
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Doctor, doctor => doctor.medicalRecords)
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor

    @ManyToOne(() => Patient, patient => patient.medicalRecords)
    @JoinColumn({ name: 'patientId' })
    patient: Patient

    @Column('text')
    description: string

    @Column('text')
    recommendations: string

}
