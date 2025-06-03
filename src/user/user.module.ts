import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserGuard } from './guards/user.guard';
import { UserAgentMiddlewareClass, userAgentMiddlewareFunction, UserAgentOptions } from 'src/middlewares/user-agent.middleware';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: 'USER_GUARD',
    //   useClass: UserGuard
    // }
    {
      provide: UserAgentOptions,
      useValue: ["firefox", "mozilla", "chrome"]
    } 
  ]
})
export class UserModule implements NestModule{
  // for class based
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(userAgentMiddlewareFunction).forRoutes('user')
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddlewareClass).forRoutes('user')
    // multiple middleware
    consumer.apply(AuthMiddleware, UserAgentMiddlewareClass).forRoutes('user');

    // multiple routes
    // consumer.apply(UserAgentMiddlewareClass).forRoutes('user', 'routes1', 'route2')

    // use can also use wildcards
    // consumer.apply(UserAgentMiddlewareClass).forRoutes('user*'); for user, users, usera, userb
    // refs? s ho bhi skta hai aur nhi bhi ref, refs
    
    // we can also pass Controller class also
    // consumer.apply(UserAgentMiddlewareClass).forRoutes(UserController);
    
    // for specific method
    // consumer.apply(UserAgentMiddlewareClass).forRoutes({path: "users/hello", method: RequestMethod.GET});

    // different combination
    // consumer.apply(UserAgentMiddlewareClass).forRoutes("users", {path: "users/hello", method: RequestMethod.GET}, UserController);

    // exclude route
    // consumer.apply(UserAgentMiddlewareClass).exclude({path: 'users', method: RequestMethod.GET}, 'routename' ).forRoutes(UserController);


  }
}
