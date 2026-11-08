import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port', 4000);
  const host = configService.get<string>('host', '0.0.0.0');
  const prefix = configService.get<string>('prefix', '/api/v1');
  const corsOrigin = configService.get<string>('cors.origin', 'http://localhost:3000');

  // Security middlewares
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: corsOrigin.split(','),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(prefix);

  // Enable shutdown hooks for graceful termination
  app.enableShutdownHooks();

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce Platform API')
    .setDescription('Modular Monolith REST API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port, host);
  logger.log(`API Application listening at http://${host}:${port}${prefix}`);
  logger.log(`Swagger OpenAPI documentation available at http://${host}:${port}/api/docs`);
}

void bootstrap();
