import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { envSchema } from '@tomi/validation';

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            // imports: [], //Aqui importa o modulo do EnvService caso esteja em outro modulo
            inject: [EnvService],
            useFactory: (env: EnvService) => ({
                type: 'sqlite',
                database: env.get('DATABASE_URL'),
                entities: [__dirname + '/../**/modules/**/*.entity{.ts,.js}'],
                synchronize: env.get('NODE_ENV') !== "production",
            }),
        }),
    ],
    providers: [EnvService],
    exports: [EnvService],
})
export class ConfigModule { }
