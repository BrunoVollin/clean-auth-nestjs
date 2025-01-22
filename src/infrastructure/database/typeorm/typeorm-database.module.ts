import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeORMUserRepository } from './repository/typeorm-user.repository';
import { TypeORMUDashboardRepository } from './repository/typeorm-dashboard.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [UserEntity],
        synchronize: true, 
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    { provide: 'UserRepository', useClass: TypeORMUserRepository },
    { provide: 'DashboardRepository', useClass: TypeORMUDashboardRepository },
  ],
  exports: ['UserRepository', 'DashboardRepository'],
})
export class TypeORMDatabaseModule {}
