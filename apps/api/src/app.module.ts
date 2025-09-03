import { Module } from '@nestjs/common';
import { EnvService } from './config/env/env.service';
import { ConfigModule } from './config/config.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TaskModule,
    UserModule
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule { }
