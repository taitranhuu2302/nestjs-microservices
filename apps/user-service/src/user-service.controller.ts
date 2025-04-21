import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto, User, UserById, Users } from './type';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(data: UserById): User | undefined {
    return this.userServiceService.findOne(data.id);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll(): Users {
    return { users: this.userServiceService.findAll() };
  }

  @GrpcMethod('UserService', 'Create')
  create(data: CreateUserDto): User {
    return this.userServiceService.create(data);
  }
}
