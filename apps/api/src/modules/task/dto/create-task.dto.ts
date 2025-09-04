import { ApiProperty } from '@nestjs/swagger';
import { taskSchema, zod } from '@tomi/validation'

export class CreateTaskDto implements zod.infer<typeof taskSchema> {
    @ApiProperty({ example: 'My Task Title', description: 'The title of the task' })
    title: string;

    @ApiProperty({ example: 'My Task Description', description: 'The description of the task' })
    description: string;

    @ApiProperty({ example: 'psousaj', description: 'The user login associated with the task' })
    userLogin: string;

    id: number;
    completed: boolean;
}
