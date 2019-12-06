import {custom, date, identifier, list, object, serializable} from 'serializr';
import {WebhookType} from './webhook-type';

export class Webhook{
  @serializable(identifier())
  id: number;

  @serializable(list(object(WebhookType)))
  webhookTypes: WebhookType[];

  @serializable
  storageId: number;

  //@serializable(object(Storage))
  storage: Storage;

  @serializable
  name: string;

  @serializable
  description: string;

  @serializable
  token: string;

  @serializable(custom(config => config, config => config))
  config: any;

  @serializable(custom(data => data, data => data))
  data: any;

  @serializable(date())
  creationDate: Date;

  @serializable(date())
  updatedOn: Date;

  @serializable(date())
  deletionDate: Date;

  getTypes() {
    return this.webhookTypes.map(type => type.name);
  }
}
