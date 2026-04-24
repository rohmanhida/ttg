import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connected');
    } catch (err) {
      console.error('❌ Database connection failed:', err);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
