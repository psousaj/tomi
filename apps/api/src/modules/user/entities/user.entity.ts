import { Task } from "src/modules/task/entities/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    login: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    avatar_url: string;

    @ManyToOne(() => Task, (task) => task.user)
    tasks: Task[]
}
