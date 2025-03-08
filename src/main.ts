import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  Logger.log('🚀 Server running on http://localhost:3000', 'Bootstrap');
}
bootstrap();
