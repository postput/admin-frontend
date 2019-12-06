import {StorageType} from './storage-type';
import {custom, date, identifier, list, object, serializable} from 'serializr';
import {Webhook} from './webhook';


export class Storage{

  @serializable(identifier())
  id: number;

  @serializable
  uuid: string;

  @serializable(list(object(Webhook)))
  webhooks: Webhook[];

  @serializable
  name: string;

  @serializable
  typeId: number;

  @serializable(object(StorageType))
  type: StorageType;

  @serializable(custom(config => config, config => config))
  data: any;

  @serializable(custom(data => data, data => data))
  config: any;

  @serializable(date())
  creationDate: Date;

  @serializable(date())
  updatedOn: Date;

  deletionDate: Date;
};
