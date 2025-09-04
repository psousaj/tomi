import { ApiProperty } from '@nestjs/swagger';
import { updateTaskSchema, zod } from '@tomi/validation';

export class UpdateTaskDto implements zod.infer<typeof updateTaskSchema> {
    @ApiProperty({ example: 'My Updated Task Title', description: 'The updated title of the task', required: false })
    title?: string;

    @ApiProperty({ example: 'My Updated Task Description', description: 'The updated description of the task', required: false })
    description?: string;

    @ApiProperty({ example: true, description: 'Whether the task is completed', required: false })
    completed?: boolean;
}
