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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true, // import krne ki jaroorat nhi pdegi
      load: config // array of config files
    }),
    UserModule,
    OrderModule,
    JobsModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // set interceptor at module level
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
