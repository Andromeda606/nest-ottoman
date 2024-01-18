import { ModuleMetadata } from '@nestjs/common';
import { ClassModel } from '../ottoman.types';

export interface AsyncClassModel extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ClassModel> | ClassModel;
  inject?: any[];
}
