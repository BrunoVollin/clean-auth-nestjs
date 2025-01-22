// src/infrastructure/modules/auth.module.ts
import { Global, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { InMemoryUserRepository } from '../database/in-memory/in-memory-user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateUserUsecase } from 'src/application/use-cases/create-user.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
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
