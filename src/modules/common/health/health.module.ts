import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';

@Module({
  imports: [TerminusModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
