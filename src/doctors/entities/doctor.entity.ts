
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/users/entities/user.entity";
import { DoctorSpeciality } from "src/enums/doctor-specialty";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { Shift } from "src/shifts/entities/shift.entity";
import { MedicalRecord } from "src/medical-records/entities/medical-record.entity";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({
        type: "enum",
        enum: ["general", "pediatrics", "cardiology"],
        default: "general"
    })
    speciality: DoctorSpeciality

    
    @ManyToOne(() => User, user => user.doctors)
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments: Appointment[]

    
    @OneToMany(() => Shift, shift => shift.doctor)
    shifts: Shift[]

    @OneToMany(() => MedicalRecord, medicalRecord => medicalRecord.doctor)
    medicalRecords: MedicalRecord[]

}
