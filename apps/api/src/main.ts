import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env/env.service';
import { TypeOrmExceptionFilter } from './common/filters/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService)

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:3000', 'http://meu-frontend.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(env.get('APIPORT'), '0.0.0.0');
}
bootstrap();
