export class ModelNotRespectedException extends Error {
  constructor(modelName) {
    super(
      `Model ${modelName} is not respected, please check your model definition.`,
    );
  }
}
