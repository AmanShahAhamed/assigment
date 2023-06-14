import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  app.setGlobalPrefix(`api/${app.get(ConfigService).get('VERSION')}`);
  const PORT = app.get(ConfigService).get('PORT') || 3002;
  console.log(`app is running at ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
