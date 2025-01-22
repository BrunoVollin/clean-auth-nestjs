import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private readonly filePath = path.resolve('users.json');

  constructor() {
    this.loadFromFile();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async save(user: User): Promise<User> {
    user.id = this.generateUniqueId();
    this.users.push(user);
    this.saveToFile();
    return user;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private loadFromFile(): void {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.users = JSON.parse(data) as User[];
    } catch (error) {
      console.error('Error loading users from file:', error.message);
      this.users = [];
    }
  }

  private saveToFile(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving users to file:', error.message);
    }
  }
}
