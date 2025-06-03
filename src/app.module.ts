import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import config from '../config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables : true,
      isGlobal: true,
      load: config
    }),
    UserModule,
    OrderModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
