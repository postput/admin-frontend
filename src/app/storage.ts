import {StorageType} from "./storage-type";
import {custom, date, identifier, object, serializable} from "serializr";


export class Storage{

  @serializable(identifier())
  id: number;

  @serializable
  uuid: string;

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
