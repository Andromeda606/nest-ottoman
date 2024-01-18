import { Inject } from '@nestjs/common';
import { typesStorage } from './typesStorage';
import { DEFAULT_CLUSTER, FIELDS_KEY } from './constructors';
import { ClassModel } from './ottoman.types';
import { getModelName, isDataType } from './util';
import { ModelNotRespectedException } from './exceptions';

export function Model(
  modelName?: string,
  connectionName: string = DEFAULT_CLUSTER,
) {
  return (model) => {
    typesStorage.addModel(
      getModelName(modelName || model.name, connectionName),
      model,
    );
  };
}

export function Property() {
  return (target: any, propertyKey: string) => {
    const constructor = target.constructor;
    const type = annotate(
      Reflect.getMetadata('design:type', target, propertyKey),
    );
    const metadata = Reflect.getMetadata(FIELDS_KEY, constructor) || {};
    metadata[propertyKey] = type;
    Reflect.defineMetadata(FIELDS_KEY, metadata, constructor);
  };
}

export function annotate(arg: any) {
  if (isDataType(arg)) {
    return arg;
  }
  if (typeof arg !== 'function') {
    throw new ModelNotRespectedException(JSON.stringify(arg));
  }
  return Reflect.getOwnMetadata(FIELDS_KEY, arg);
}

export function InjectModel(
  model: ClassModel | string,
  clusterName: string = DEFAULT_CLUSTER,
) {
  if (typeof model === 'string') {
    return Inject(getModelName(model, clusterName));
  }
  return Inject(typesStorage.getModel(model));
}
