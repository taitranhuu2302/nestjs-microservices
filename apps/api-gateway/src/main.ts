import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('NestJS Microservices API')
    .setDescription('The API documentation for NestJS Microservices')
    .setVersion('1.0')
    .addTag('users', 'User operations')
    .addTag('products', 'Product operations')
    .build();

  const customOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'NestJS Microservices API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  };

  // @ts-expect-error error TS2322: Type 'string' is not assignable to type 'string | undefined'.
  const document = SwaggerModule.createDocument(app, config, customOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.port ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
