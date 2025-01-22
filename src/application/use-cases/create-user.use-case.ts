import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: Input): Promise<string> {
    const newUser = new User(null, input.email, input.password);
    const user = await this.userRepository.save(newUser);
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}

type Input = {
  email: string;
  password: string;
};
