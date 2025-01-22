import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Global,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Global()
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {

      const payload = this.jwtService.verify(token, {
        secret: 'secretKey',
      });
      request.user = payload; 
    } catch (err) {
        console.error(err);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7); 
    }
    return undefined;
  }
}
