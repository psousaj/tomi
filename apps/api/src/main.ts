import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService)

  app.setGlobalPrefix('api/v1');

  await app.listen(env.get('APIPORT'), '0.0.0.0');
}
bootstrap();
