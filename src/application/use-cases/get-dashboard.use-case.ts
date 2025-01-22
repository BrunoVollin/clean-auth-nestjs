import { Inject, Injectable } from '@nestjs/common';
import { DashboardRepository } from 'src/domain/repositories/dashboard.repository';

@Injectable()
export class GetDashboardUseCase {
  constructor(
    @Inject('DashboardRepository')
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const data = await this.dashboardRepository.getDashboard(input.userId);

    return {
      data,
    };
  }
}

type Input = {
  userId: any;
};

type Output = {
  data: any;
};
