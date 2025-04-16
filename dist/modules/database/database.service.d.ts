import { OnModuleInit } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit {
  private db;
  onModuleInit(): void;
  executeQuery<T>(query: string): Promise<T[]>;
}
