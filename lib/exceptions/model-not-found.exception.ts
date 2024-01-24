export class ModelNotFoundException extends Error {
  constructor(modelName?: string) {
    super(
      `Ottoman Model not found. Please import ${modelName} into the module that declares the collection.`,
    );
  }
}
