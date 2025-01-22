import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/domain/entities/user.entity';
import { DashboardRepository } from 'src/domain/repositories/dashboard.repository';

@Injectable()
export class TypeORMUDashboardRepository implements DashboardRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async getDashboard(userId: any): Promise<any> {
    return this.repository.findOne({ where: { id: userId } });
  }
}
