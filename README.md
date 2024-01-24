# Nestjs Ottoman
![GitHub](https://img.shields.io/github/license/Andromeda606/nest-ottoman)

> Ottoman module for Nestjs 

## Features
- Model support
- Simply add `@InjectModel(ModelName)` to your service and you are ready to go

## Installation

### Yarn
```bash
yarn add nest-ottoman ottoman
```

### NPM
```bash
npm install nest-ottoman ottoman --save
```

### PNPM
```bash
pnpm add nest-ottoman ottoman
```

## Usage
### Module Registration
```typescript
import { Module } from '@nestjs/common';
import { OttomanModule } from 'nest-ottoman';

@Module({
  imports: [
    OttomanModule.forRoot({
      connectionString: 'couchbase://localhost',
    }),
  ],
})

export class AppModule {}
```

Async registration is also available:
```typescript
import { Module } from '@nestjs/common';
import { OttomanModule } from 'nest-ottoman';

@Module({
  imports: [
    OttomanModule.forRootAsync({
      useFactory: () => ({
        connectionString: 'couchbase://localhost',
      }),
    }),
  ],
})

export class AppModule {}
```

### Model Registration
``@Property`` decorator is ottoman property decorator. More information about decorators can be found [here](https://ottomanjs.com/docs/basic/schema.html)
```typescript
import { Model, Property } from 'nest-ottoman';

@Model('_default')
export class DefaultModel {
  @Property()
  id: string;

  @Property()
  property: string;
}
```

### Service Registration
```typescript
import { Injectable } from '@nestjs/common';
import { DefaultModel } from './collections/foo.collection';
import { Model, InjectModel } from 'nest-ottoman';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(DefaultModel)
    private readonly defaultModel: Model<DefaultModel>,
  ) {}
  
  findAll(): Promise<DefaultModel[]> {
    return this.defaultModel.find();
  }
}
```

## Decorators
| Decorator                         | Description                         |
|-----------------------------------|-------------------------------------|
| `@ModelClass(bucketName: string)` | Decorator for model registration    |
| `@Property()`                     | Decorator for property registration |

## Nest Ottoman Module Options
| Option                                            | Description                  |
|---------------------------------------------------|------------------------------|
| `connectionString: string`                        | Couchbase connection string  |
| `connector?: string`                              | Couchbase connector name     |
| `ottomanConfig?: typeof Ottoman.prototype.config` | Ottoman config               |
| `retryAttempts?: number`                          | Number of retry attempts     |
| `retryDelay?: number`                             | Delay between retry attempts |



## Example Application
Example application can be found [here](https://github.com/Andromeda606/nest-ottoman/tree/master/example)