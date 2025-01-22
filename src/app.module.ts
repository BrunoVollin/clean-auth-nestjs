import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { AppController } from './app.controller';
import { TypeORMDatabaseModule } from './infrastructure/database/typeorm/typeorm-database.module';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { DashboardModule } from './infrastructure/modules/dashboard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    // InMemoryDatabaseModule,
    TypeORMDatabaseModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AuthenticateUserUseCase],
})
export class AppModule {}
