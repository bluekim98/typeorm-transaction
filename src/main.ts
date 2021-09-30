import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: { retryAttempts: 5, retryDelay: 3000 },
    });

    await app.startAllMicroservices();
    await app.listen(3005);
}
bootstrap();
