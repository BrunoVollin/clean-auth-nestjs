import { Module } from '@nestjs/common';
import { DashboardController } from '../controllers/dashboard.controller';
import { GetDashboardUseCase } from 'src/application/use-cases/get-dashboard.use-case';

@Module({
  controllers: [DashboardController],
  providers: [GetDashboardUseCase],
})
export class DashboardModule {}
