// src/infrastructure/database/typeorm-database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { InMemoryUserRepository } from './in-memory-user.repository';

@Global()
@Module({
  imports: [],
  providers: [{ provide: 'UserRepository', useClass: InMemoryUserRepository }],
  exports: ['UserRepository'],
})
export class InMemoryDatabaseModule {}
