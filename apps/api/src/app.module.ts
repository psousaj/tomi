import { Module } from '@nestjs/common';
import { EnvService } from './config/env/env.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule { }
