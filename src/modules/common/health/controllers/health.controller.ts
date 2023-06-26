import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import {
  HealthCheckRequest,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
} from '../../../../protobuf/health.pb';
import { HealthService } from '../services/health.service';

@Controller()
export class HealthController {
  constructor(private healthService: HealthService) {}
  @GrpcMethod('Health', 'Check')
  async check(data: HealthCheckRequest): Promise<HealthCheckResponse> {
    const status: HealthCheckResponse_ServingStatus =
      await this.healthService.check(data.service);
    return { status };
  }
}

