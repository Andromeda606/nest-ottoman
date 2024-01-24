import { Ottoman } from 'ottoman';

export interface OttomanModuleOptions {
  connectionString: string;
  connector?: string;
  ottomanConfig?: typeof Ottoman.prototype.config;
  retryAttempts?: number;
  retryDelay?: number;
}
