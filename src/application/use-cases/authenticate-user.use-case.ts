// src/application/use-cases/authenticate-user.use-case.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: Input): Promise<string> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user || user.password !== input.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}

type Input = {
  email: string;
  password: string;
};
