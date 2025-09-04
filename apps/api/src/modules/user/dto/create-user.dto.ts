import { ApiProperty } from '@nestjs/swagger';
import { githubUserSchema, zod } from '@tomi/validation'

export class CreateUserDto implements zod.infer<typeof githubUserSchema> {
    @ApiProperty({ example: 'psousaj', description: 'The user login' })
    login: string;

    @ApiProperty({ example: 'Pedro Sousa', description: 'The user name' })
    name: string;

    @ApiProperty({ example: 'pedro@sousa.com', description: 'The user email' })
    email: string;

    @ApiProperty({ example: 'https://github.com/psousaj.png', description: 'The URL of the user avatar', required: false })
    avatar_url?: string;
}
