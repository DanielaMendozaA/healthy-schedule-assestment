import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserRoleEnum } from "src/enums/user-role.enum";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Patient } from "src/patients/entities/patient.entity";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { name: 'user_name' })
    name: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text')
    phone: string;

    @Column({
        type: "enum",
        enum: ["admin", "doctor", "patient"],
        default: "patient"
    })
    role: UserRoleEnum
    
    @OneToMany(() => Doctor, doctor => doctor.user)
    doctors: Doctor[]

    @OneToMany(() => Patient, patient => patient.user)
    patients: Patient[]



}
