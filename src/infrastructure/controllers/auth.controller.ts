import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { CreateUserUsecase } from 'src/application/use-cases/create-user.use-case';
import { SignInDto } from 'src/application/dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const token = await this.authenticateUserUseCase.execute(loginDto);
    return { token };
  }
  @Post('signin')
  async signin(@Body() signinDto: SignInDto): Promise<{ token: string }> {
    const token = await this.createUserUsecase.execute(signinDto);
    return { token };
  }
}
