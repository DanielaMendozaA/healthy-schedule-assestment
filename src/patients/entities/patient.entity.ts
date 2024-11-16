import { Appointment } from "src/appointments/entities/appointment.entity";
import { MedicalRecord } from "src/medical-records/entities/medical-record.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    age: number

    @Column('decimal')
    weight: number

    @ManyToOne(() => User, user => user.patients)
    @JoinColumn({ name: 'userId' })
    user: User

    
    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[]

    @OneToMany(() => MedicalRecord, medicalRecord => medicalRecord.patient)
    medicalRecords: MedicalRecord[]
    
}
