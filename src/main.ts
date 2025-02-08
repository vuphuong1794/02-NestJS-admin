import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //tránh các field không được khai báo trong DTO
    forbidNonWhitelisted: true, //báo lỗi khi có field không được khai báo trong DTO
    transform: true
  }));

  app.setGlobalPrefix('api/v1', {exclude: ['']});

  await app.listen( port );
  
}
bootstrap();
