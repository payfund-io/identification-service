// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class HealthService{
//     constructor(){}

//     async check(){
        
//     }
// }


import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  HEALTH_V1_PACKAGE_NAME,
  HealthCheckResponse_ServingStatus,
} from '../../../../protobuf/health.pb';
import { HealthStatus } from '../../../../@types';

@Injectable()
export class HealthService {
  logger: Logger = new Logger('HealthService');
  constructor(
    private healthCheckService: HealthCheckService,
    private databaseIndicatorService: TypeOrmHealthIndicator,
  ) {}

  async check(service: string): Promise<HealthCheckResponse_ServingStatus> {
    this.logger.log('Checking service health status');

    if (service !== HEALTH_V1_PACKAGE_NAME)
      return HealthCheckResponse_ServingStatus.UNRECOGNIZED;

    const _services = await Promise.all([
      this.databaseIndicatorService.pingCheck('[POSTGRES DATABASE]'),
    ]);
    const services: (() => HealthIndicatorResult)[] = _services.map(
      (service) => () => service,
    );
    const condition = await this.healthCheckService.check(services);

    const assertConditions = (condition: HealthCheckResult) => {
      if (condition.status !== HealthStatus.OK)
        return HealthCheckResponse_ServingStatus.NOT_SERVING;
      else {
        const systems = Object.keys(condition.info);
        for (const system of systems) {
          if (condition.info[system].status != HealthStatus.UP)
            return HealthCheckResponse_ServingStatus.NOT_SERVING;
        }
        return HealthCheckResponse_ServingStatus.SERVING;
      }
    };

    return assertConditions(condition);
  }
}
