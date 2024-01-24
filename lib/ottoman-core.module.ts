import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import { Ottoman } from 'ottoman';
import { DEFAULT_CLUSTER } from './constructors';
import { getConnectionName, handleRetry } from './util';
import { defer, lastValueFrom } from 'rxjs';
import { OttomanModuleAsyncOptions, OttomanModuleOptions } from './interfaces';

@Global()
@Module({})
export class OttomanCoreModule {
  public static forRoot({
    connectionString,
    connector = DEFAULT_CLUSTER,
    ottomanConfig,
    retryAttempts,
    retryDelay,
  }: OttomanModuleOptions): DynamicModule {
    const ottomanCluster: FactoryProvider<Ottoman> = {
      provide: getConnectionName(connector),
      useFactory: () => {
        const ottoman = new Ottoman(ottomanConfig);
        return lastValueFrom(
          defer(async () => ottoman.connect(connectionString)).pipe(
            handleRetry(retryAttempts, retryDelay),
          ),
        );
      },
    };

    return {
      providers: [ottomanCluster],
      module: OttomanCoreModule,
      exports: [ottomanCluster.provide],
    };
  }

  public static forRootAsync({
    connector = DEFAULT_CLUSTER,
    useFactory,
    inject,
  }: OttomanModuleAsyncOptions): DynamicModule {
    const ottomanCluster: FactoryProvider<Ottoman> = {
      provide: getConnectionName(connector),
      useFactory: async (...args: any[]) => {
        const { connectionString, retryAttempts, retryDelay, ottomanConfig } =
          await useFactory(...args);
        const ottoman = new Ottoman(ottomanConfig);
        return lastValueFrom(
          defer(async () => ottoman.connect(connectionString)).pipe(
            handleRetry(retryAttempts, retryDelay),
          ),
        );
      },
      inject,
    };

    return {
      providers: [ottomanCluster],
      module: OttomanCoreModule,
      exports: [ottomanCluster.provide],
    };
  }
}
