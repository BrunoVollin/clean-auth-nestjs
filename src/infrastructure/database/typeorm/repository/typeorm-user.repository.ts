import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOneBy({ email });
    if (!userEntity) return null;

    return new User(userEntity.id, userEntity.email, userEntity.password);
  }

  async save(user: User): Promise<User> {
    const userEntity = this.repository.create({
      id: user.id,
      email: user.email,
      password: user.password,
    });

    const savedUser = await this.repository.save(userEntity);

    return new User(savedUser.id, savedUser.email, savedUser.password);
  }
}