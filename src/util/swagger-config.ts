import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerConfig = (app: INestApplication) => {
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API docs for darsoft-test project')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'Bearer',
            bearerFormat: 'Bearer',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'Header',
          },
          'authorization',
        )
        .build(),
      {
      	operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
      }
    ),
    {
      swaggerOptions: {
        apisSorter: 'alpha',
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
      },
    },
  );
};
