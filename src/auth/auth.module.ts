import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret, // Cambia esto por tu secreto
      // signOptions: { expiresIn: '60m' }, // Configura el tiempo de expiración según tu necesidad
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
