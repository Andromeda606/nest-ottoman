import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-ottoman';
import { DefaultModel } from './collections/foo.collection';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(DefaultModel)
    private readonly defaultModel: Model<DefaultModel>,
  ) {
    defaultModel
      .create({
        foo: {
          coordinates: 'coordinates',
        },
        bar: 'baz',
      })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
