import {custom, date, identifier, serializable} from "serializr";

export class WebhookType {
  @serializable(identifier())
  id: number;

  @serializable
  name: string;

  @serializable
  description: string;

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
}
