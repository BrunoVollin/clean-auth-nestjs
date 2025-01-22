// src/infrastructure/database/typeorm-database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeORMUserRepository } from './repository/typeorm-user.repository';
import { TypeORMUDashboardRepository } from './repository/typeorm-dashboard.repository';

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'root',
  password: 'root',
  database: 'ts',
  entities: [UserEntity],
  synchronize: true,
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    { provide: 'UserRepository', useClass: TypeORMUserRepository },
    { provide: 'DashboardRepository', useClass: TypeORMUDashboardRepository },
  ],
  exports: ['UserRepository', 'DashboardRepository'],
})
export class TypeORMDatabaseModule {}
