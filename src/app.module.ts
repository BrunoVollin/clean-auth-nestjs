import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { AppController } from './app.controller';
import { TypeORMDatabaseModule } from './infrastructure/database/typeorm/typeorm-database.module';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { InMemoryDatabaseModule } from './infrastructure/database/in-memory/in-memory-database.module';
import { DashboardModule } from './infrastructure/modules/dashboard.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    // InMemoryDatabaseModule,
    TypeORMDatabaseModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AuthenticateUserUseCase],
})
export class AppModule {}
