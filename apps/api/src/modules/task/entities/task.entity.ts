import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;

    @Column()
    @JoinColumn({ name: "userLogin" })
    userLogin: string;

    @OneToMany(() => User, (user) => user.tasks)
    user: User;
}
