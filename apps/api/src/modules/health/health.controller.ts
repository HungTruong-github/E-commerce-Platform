import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { PrismaService } from '@/database/prisma.service';

export interface LivenessResult {
  status: 'ok';
  uptime: number;
  timestamp: string;
}

export interface ReadinessResult {
  status: 'ok' | 'degraded';
  timestamp: string;
  checks: {
    database: 'up' | 'down';
  };
}

export interface HealthCheckResult {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  checks: {
    database: 'up' | 'down';
  };
}

@ApiTags('System')
@Controller('health')
export class HealthController {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'System Health Check (Aggregate)' })
  @SwaggerResponse({
    status: 200,
    description: 'System operational status and dependencies',
  })
  async check(): Promise<HealthCheckResult> {
    const isDbAlive = await this.prisma.ping();

    return {
      status: isDbAlive ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '0.1.0',
      checks: {
        database: isDbAlive ? 'up' : 'down',
      },
    };
  }

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Liveness Probe' })
  @SwaggerResponse({
    status: 200,
    description: 'Application process is responsive',
  })
  liveness(): LivenessResult {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness Probe' })
  @SwaggerResponse({
    status: 200,
    description: 'Application dependencies are available and ready to accept traffic',
  })
  @SwaggerResponse({
    status: 503,
    description: 'Critical dependencies unavailable',
  })
  async readiness(): Promise<ReadinessResult> {
    const isDbAlive = await this.prisma.ping();

    if (!isDbAlive) {
      throw new ServiceUnavailableException({
        status: 'degraded',
        message: 'Database dependency is unavailable',
        checks: {
          database: 'down',
        },
      });
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'up',
      },
    };
  }
}
