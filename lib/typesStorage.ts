import { ClassModel } from './interfaces';

class TypesStorageHost {
  private models: Array<{
    model: ClassModel;
    modelName: string;
  }> = [];

  addModel(modelName: string, model: ClassModel) {
    this.getModels().push({ model, modelName });
  }

  getModel(modelClass: ClassModel): string | undefined {
    return this.getModels().find((model) => model.model === modelClass)
      ?.modelName;
  }

  getModels() {
    return this.models;
  }
}

const globalRef = global as any;

export const typesStorage: TypesStorageHost =
  globalRef.OttomanTypeStorage ||
  (globalRef.OttomanTypeStorage = new TypesStorageHost());
