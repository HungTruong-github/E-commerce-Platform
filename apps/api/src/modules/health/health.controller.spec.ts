import { Test, type TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaService } from '@/database/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaMock: { ping: jest.Mock };

  beforeEach(async () => {
    prismaMock = {
      ping: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return aggregate health check result', async () => {
    const result = await controller.check();
    expect(result.status).toBe('ok');
    expect(result.checks.database).toBe('up');
    expect(typeof result.uptime).toBe('number');
    expect(typeof result.timestamp).toBe('string');
  });

  it('should return liveness result', () => {
    const result = controller.liveness();
    expect(result.status).toBe('ok');
    expect(typeof result.uptime).toBe('number');
  });

  it('should return readiness result when database is reachable', async () => {
    const result = await controller.readiness();
    expect(result.status).toBe('ok');
    expect(result.checks.database).toBe('up');
  });

  it('should throw ServiceUnavailableException when database is unreachable', async () => {
    prismaMock.ping.mockResolvedValueOnce(false);
    await expect(controller.readiness()).rejects.toThrow(ServiceUnavailableException);
  });
});
