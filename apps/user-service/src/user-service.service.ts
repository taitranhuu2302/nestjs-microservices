import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './type';

@Injectable()
export class UserServiceService {
  private users: User[] = [];

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  findAll() {
    return this.users;
  }

  create(data: { name: string; email: string }) {
    const user: User = { id: uuidv4(), ...data };
    this.users.push(user);
    return user;
  }
}
