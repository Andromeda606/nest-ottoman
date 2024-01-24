import { ModelTypes } from 'ottoman';

export type Model<T> = ModelTypes<T>;

export type ClassModel = new (...args: any[]) => any;
