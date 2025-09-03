import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService)

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: ['http://localhost:3000', 'http://meu-frontend.com'], // permitidas
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // permite cookies e headers de autenticação
  });

  await app.listen(env.get('APIPORT'), '0.0.0.0');
}
bootstrap();
