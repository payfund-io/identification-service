import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvironment } from './configs/env.configs';
import { HealthModule } from './modules/common/health/health.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      load: getEnvironment(),
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('postgres.host'),
      port: configService.get('postgres.port'),
      username: configService.get('postgres.username'),
      password: configService.get('postgres.password'),
      database: configService.get('postgres.database'),
      entities: [__dirname + '/../**/*.entity.(js,ts)'],
      synchronize: true,
    }),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
