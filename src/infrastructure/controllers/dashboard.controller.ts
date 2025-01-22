import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GetDashboardUseCase } from 'src/application/use-cases/get-dashboard.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardUseCase: GetDashboardUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async login(@Request() req: any): Promise<{ data: any }> {
    const id = req.user.sub;

    const dashbord = await this.dashboardUseCase.execute({ userId: id });

    return {
      data: {
        dashbord,
      },
    };
  }
}
