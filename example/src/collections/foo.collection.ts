import { Model, Property } from 'nestjs-ottoman';

export class CircularProperty {
  @Property()
  coordinates: string;
}

@Model('_default')
export class DefaultModel {
  @Property()
  id: string;

  @Property()
  abc: CircularProperty;

  @Property()
  bbb: string;

  @Property()
  asAsaSAsa: string;
}
