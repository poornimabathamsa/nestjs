import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Use .env PORT or default 3000

   // ✅ Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Remove unexpected fields
      forbidNonWhitelisted: true, // Throw error for extra fields
      transform: true,          // Auto-transform to DTO types
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Outreach Admin Service API')
    .setDescription('API documentation for Outreach Admin Service')
    .setVersion('1.0')
    .addBearerAuth() // If you’re using JWT Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
    // ✅ Console log the running port and swagger docs URL
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📄 Swagger Docs available at http://localhost:${port}/api-docs`);
  
}
bootstrap();
