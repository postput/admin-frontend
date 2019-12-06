import {serializable} from "serializr";

export class WebhookTypes {
  @serializable
  webhookId: number;

  @serializable
  webhookTypeId: number;
}
