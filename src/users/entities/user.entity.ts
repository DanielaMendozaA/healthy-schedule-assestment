import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserRoleEnum } from "src/enums/user-role.enum";



@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { name: 'user_name'})
    name: string;

    @Column('text', { unique: true})
    email: string;

    @Column('text', { select: false})
    password: string;

    @Column('text')
    phone: string;

    @Column({
        type: "enum",
        enum: ["admin", "client"],
        default: "client"
    })
    role: UserRoleEnum

}
