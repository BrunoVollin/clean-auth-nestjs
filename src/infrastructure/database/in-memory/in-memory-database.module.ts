import { Global, Module } from '@nestjs/common';
import { InMemoryUserRepository } from './in-memory-user.repository';

@Global()
@Module({
  imports: [],
  providers: [{ provide: 'UserRepository', useClass: InMemoryUserRepository }],
  exports: ['UserRepository'],
})
export class InMemoryDatabaseModule {}
