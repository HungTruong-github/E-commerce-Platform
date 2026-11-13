import { Injectable, type OnModuleInit, type OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Prisma connected to PostgreSQL database successfully.');
    } catch (error) {
      this.isConnected = false;
      this.logger.error(
        `Critical: Database startup connection failed. PostgreSQL service is unavailable: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async ping(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      this.isConnected = true;
      return true;
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(
        `Database ping check failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      return false;
    }
  }

  get connected(): boolean {
    return this.isConnected;
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      this.logger.warn(
        `Prisma disconnect warning: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    this.isConnected = false;
    this.logger.log('Prisma disconnected from database.');
  }
}
