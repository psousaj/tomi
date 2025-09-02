import { Module } from '@nestjs/common';
import { EnvService } from './config/env/env.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@tomi/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule { }
