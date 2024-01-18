import { OttomanModuleOptions } from './module-options.interface';

export type OttomanModuleAsyncFactoryOptions = Omit<
  OttomanModuleOptions,
  'connector'
>;
