import { ModelTypes } from 'ottoman';

export type ModelClass<T> = ModelTypes<T>;

export type ClassModel = new (...args: any[]) => any;
