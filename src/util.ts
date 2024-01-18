import { FIELDS_KEY, OTTOMAN_CONNECTOR } from './constructors';
import { delay, Observable, retryWhen, scan } from 'rxjs';
import { Logger } from '@nestjs/common';
import { OttomanModule } from './ottoman.module';
import { Schema } from 'ottoman';

export const getConnectionName = (connector: string) => {
  return `${OTTOMAN_CONNECTOR}/${connector}`;
};

export const getModelName = (modelName: string, connectorName: string) => {
  return `${getConnectionName(connectorName)}/${modelName}`;
};

export const classToSchema = (model: any): Schema => {
  const modelFields = Reflect.getMetadata(FIELDS_KEY, model);
  return new Schema(modelFields);
};

export function isDataType(value: any): boolean {
  return (
    value === String ||
    value === Number ||
    value === Boolean ||
    value instanceof Date
  );
}

export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  const logger = new Logger(OttomanModule.name);
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen((e) =>
        e.pipe(
          scan((errorCount, error) => {
            logger.error(
              `Unable to connect to the database. Retrying (${
                errorCount + 1
              })...`,
              '',
            );
            if (errorCount + 1 >= retryAttempts) {
              throw error;
            }
            return errorCount + 1;
          }, 0),
          delay(retryDelay),
        ),
      ),
    );
}
