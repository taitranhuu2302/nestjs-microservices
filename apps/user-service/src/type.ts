export interface UserById {
  id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  name: string;
  email: string;
}
