import { ApiProperty } from '@nestjs/swagger';
import { updateUserSchema, zod } from '@tomi/validation';

export class UpdateUserDto implements zod.infer<typeof updateUserSchema> {
    @ApiProperty({ example: 'psousaj', description: 'The user login', required: false })
    login?: string;

    @ApiProperty({ example: 'Pedro Sousa', description: 'The username', required: false })
    name?: string;

    @ApiProperty({ example: 'pedro@sousa.com', description: 'The useremail', required: false })
    email?: string;

    @ApiProperty({ example: 'https://github.com/psousaj.png', description: 'The URL of the user avatar', required: false })
    avatar_url?: string;
}
