import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { authMiddleware } from './middlewares/auth.middleware';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: {
      origin: '*', // Allow all origins
      methods: '*', // Allow all methods (GET, POST, etc.)
    },
  });
  // agar hum yha pe pass krna chahte hain to function middleware hi pass kr skte hain 
  // yha pe class middleware nhi pass kr skte
  // app.use(authMiddleware)

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  // set interceptor at global level
  // app.useGlobalInterceptors( new LoggerInterceptor())
  // await app.listen(port ?? 3000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
