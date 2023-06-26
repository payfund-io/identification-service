import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { HEALTH_V1_PACKAGE_NAME } from './protobuf/health.pb';

async function bootstrap() {
  let app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const options = {
    transport: Transport.GRPC,
    options: {
      url: config.get<String>('app.url'),
      package: [HEALTH_V1_PACKAGE_NAME],
      protoPath: [
        join('node_modules/@payfund/grpc-proto/proto/health.proto'),
      ],
    },
  };
  app = await NestFactory.createMicroservice(AppModule, options);
  await app.listen();
}
bootstrap();
