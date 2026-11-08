import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';

export interface HealthCheckResult {
  status: 'ok';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

@ApiTags('System')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'System Health Check' })
  @SwaggerResponse({
    status: 200,
    description: 'System is operational and ready to accept requests',
  })
  check(): HealthCheckResult {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '0.1.0',
    };
  }
}
