dia 1 21/01
- ver se da para adicionar um refresh token 
- adicionar docker 
- adicionar teste unitarios 
- adicionar postgress via prisma   


### 1. **Domínio**
O domínio deve conter suas entidades e contratos. Ele não conhece o Prisma nem qualquer outro detalhe de infraestrutura.

```typescript
// src/domain/entities/user.entity.ts
export class User {
  constructor(public id: string, public email: string, public password: string) {}
}

// src/domain/repositories/user.repository.ts
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
```

---

### 2. **Aplicação**
Aqui ficam os casos de uso, que dependem dos contratos definidos no domínio.

```typescript
// src/application/use-cases/authenticate-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return 'TokenGenerated'; // Geração de token separada
  }
}
```

---

### 3. **Infraestrutura**
Aqui está o Prisma e sua implementação dos repositórios. Isso garante que o Prisma fique isolado como detalhe de implementação.

#### Configuração do Prisma

1. Instale o Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. Crie o arquivo de schema do Prisma:
   ```prisma
   // prisma/schema.prisma
   model User {
     id       String  @id @default(cuid())
     email    String  @unique
     password String
   }
   ```

3. Geração do cliente Prisma:
   ```bash
   npx prisma generate
   ```

#### Implementação do Repositório com Prisma

```typescript
// src/infrastructure/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.email, user.password);
  }

  async save(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: { email: user.email, password: user.password },
    });
    return new User(createdUser.id, createdUser.email, createdUser.password);
  }
}
```

---

### 4. **Configuração do Módulo**
Use a inversão de dependência para registrar o Prisma como uma implementação concreta.

```typescript
// src/infrastructure/database/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class PrismaModule {}
```

---

### 5. **Importação no Módulo Principal**
Garanta que a implementação seja registrada corretamente no contexto do módulo principal.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';

@Module({
  imports: [PrismaModule],
  providers: [AuthenticateUserUseCase],
})
export class AppModule {}
```

---

### 6. **Vantagens da Abordagem**
- **Desacoplamento:** O Prisma está isolado na camada de infraestrutura. Alterar o ORM ou a base de dados no futuro não afetará o domínio ou os casos de uso.
- **Testabilidade:** Você pode substituir o repositório Prisma por um mock ou uma implementação in-memory para testes.
- **Flexibilidade:** O domínio permanece livre de dependências externas.

---

Essa abordagem garante que a integração com o Prisma respeite os princípios do Clean Code e da Clean Architecture.