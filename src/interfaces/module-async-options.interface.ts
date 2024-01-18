import { ModuleMetadata } from '@nestjs/common';
import { OttomanModuleAsyncFactoryOptions } from './module-async-factory-options.interface';

export interface OttomanModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  connector?: string;
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<OttomanModuleAsyncFactoryOptions>
    | OttomanModuleAsyncFactoryOptions;
  inject?: any[];
}
