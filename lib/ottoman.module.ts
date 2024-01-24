import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { Ottoman } from 'ottoman';
import { typesStorage } from './typesStorage';
import { ClassModel } from './ottoman.types';
import { DEFAULT_CLUSTER } from './constructors';
import { OttomanCoreModule } from './ottoman-core.module';
import { classToSchema, getConnectionName, getModelName } from './util';
import { ModelNotFoundException } from './exceptions';
import {
  OttomanModuleAsyncOptions,
  OttomanModuleOptions,
} from './interfaces';

@Module({})
export class OttomanModule {
  public static forRoot(args: OttomanModuleOptions): DynamicModule {
    return {
      module: OttomanModule,
      imports: [OttomanCoreModule.forRoot(args)],
    };
  }

  public static forRootAsync(
    options: OttomanModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: OttomanModule,
      imports: [OttomanCoreModule.forRootAsync(options)],
    };
  }

  public static forFeature(
    models: ClassModel[],
    clusterName: string = DEFAULT_CLUSTER,
  ): DynamicModule {
    const modelProviders: FactoryProvider[] = models.map((model) => {
      let modelName = typesStorage.getModel(model);

      if (!modelName) {
        throw new ModelNotFoundException(model.name);
      }
      modelName = modelName.substring(
        getConnectionName(clusterName).length + 1,
      );

      return {
        useFactory: (ottomanCluster: Ottoman) => {
          const modelData = ottomanCluster.models[modelName];
          return (
            modelData || ottomanCluster.model(modelName, classToSchema(model))
          );
        },
        inject: [getConnectionName(clusterName)],
        provide: getModelName(modelName, clusterName),
      } as FactoryProvider;
    });

    return {
      providers: modelProviders,
      module: OttomanModule,
      exports: modelProviders.map((provider) => provider.provide),
    };
  }
}
