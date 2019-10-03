import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.connection/db-module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { authProviders, booksProviders, usersProviders, rolesProviders, usersrolesProviders} from './providers';
import { AuthService, BooksService, UsersService } from './services';
import { AuthController, UsersController, BooksController } from './controllers';
import { LocalStrategy, JwtStrategy } from './common';
import { AuthRepository, UsersRepository, UserRolesRepository} from './repositories'

import { jwtConstants } from './secrets/jwtSecretKey';
import { ConfigModule } from './environment/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),],
  controllers: [BooksController, UsersController, AuthController],
  providers: [
    AuthRepository,
    UsersRepository,
    UserRolesRepository,
    LocalStrategy,
    JwtStrategy,
    BooksService,
    ...booksProviders,
    UsersService,
    ...usersProviders,
    AuthService,
    ...authProviders,
    ...rolesProviders,
    ...usersrolesProviders
  ]
}
)
export class AppModule { }
