import {custom, date, identifier, object, serializable} from 'serializr';

export class StorageType{
  @serializable(identifier())
  id: number;

  @serializable
  name: string;

  @serializable(custom(config => config, config => config))
  config: any;

  @serializable(custom(data => data, data => data))
  data: any;
}


