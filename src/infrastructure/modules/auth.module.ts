import { Global, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { InMemoryUserRepository } from '../database/in-memory/in-memory-user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateUserUsecase } from 'src/application/use-cases/create-user.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Busca o segredo do .env
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthenticateUserUseCase,
    CreateUserUsecase,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtModule]
})
export class AuthModule {}
