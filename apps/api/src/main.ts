import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env/env.service';
import { TypeOrmExceptionFilter } from './common/filters/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService)

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Tomi API')
    .setDescription('The Tomi API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://meu-frontend.com', 'http://192.168.0.8:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(env.get('APIPORT'), '0.0.0.0');
}
bootstrap();
