import { Module } from '@nestjs/common';
import { EnvService } from './config/env/env.service';
import { ConfigModule } from './config/config.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule,
    TaskModule
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule { }
