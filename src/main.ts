import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { authMiddleware } from './middlewares/auth.middleware';


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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
