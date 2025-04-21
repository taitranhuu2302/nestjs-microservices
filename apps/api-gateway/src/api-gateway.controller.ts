import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';
import { ProductResponseDto } from './dto/product.dto';

interface UserService {
  findOne(data: { id: string }): Observable<User>;

  findAll(data: object): Observable<User[]>;

  create(data: CreateUserDto): Observable<User>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CreateProductDto {
  name: string;
  price: number;
}

@Controller()
export class ApiGatewayController {
  private userService: UserService;

  constructor(
    private readonly appService: ApiGatewayService,
    @Inject('USER_SERVICE') private readonly userClient: ClientGrpc,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get('users/:id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Param('id') id: string): Observable<User> {
    return this.userService.findOne({ id });
  }

  @Get('users')
  @ApiTags('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  getUsers(): Observable<User[]> {
    return this.userService.findAll({});
  }

  @Post('users')
  @ApiTags('users')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await lastValueFrom(this.userService.create(createUserDto));
    this.notificationClient.emit('user_created', user);
    return user;
  }

  @Get('products/:id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProduct(@Param('id') id: string): Promise<Product> {
    return lastValueFrom(
      this.productClient.send<Product>('find_one_product', id),
    );
  }

  @Get('products')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [ProductResponseDto],
  })
  async getProducts(): Promise<Product[]> {
    return lastValueFrom(
      this.productClient.send<Product[]>('find_all_products', {}),
    );
  }

  @Post('products')
  @ApiTags('products')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await lastValueFrom<Product>(
      this.productClient.send<Product>('create_product', createProductDto),
    );
    this.notificationClient.emit('product_created', product);
    return product;
  }
}
