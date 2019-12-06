import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Storage} from "./storage";
import {deserialize} from "serializr";
import {StorageType} from "./storage-type";
import {WebhookType} from "./webhook-type";
import {Webhook} from "./webhook";

@Injectable({
  providedIn: 'root'
})
export class WebhookService {

  constructor(private http: HttpClient, private api: ApiService) {
  }

  private webhooksURL = this.api.getRoot('api') + 'webhooks/';
  private allWebhookTypesURL = this.api.getRoot('api') + 'webhook-types/';

  findWebhookTypes(webhookTypes: WebhookType[], selectedWebhookTypes: number[]) {
    const swht =  webhookTypes.filter(webhookType => selectedWebhookTypes.includes(webhookType.id));
    return swht;
  }

  async getWebhook(id): Promise<Webhook> {
    const webhook = await this.http.get<Storage>(this.webhooksURL + id).toPromise();
    return deserialize(Webhook, webhook);
  }

  async getAllWebhookTypes(): Promise<WebhookType[]> {
    const webhookTypes = await this.http.get<WebhookType[]>(this.allWebhookTypesURL).toPromise();
    return deserialize(WebhookType, webhookTypes);
  }

  async createWebhook(rawWebhook): Promise<Webhook> {
    const webhook = await this.http.post<Webhook>(this.webhooksURL, rawWebhook).toPromise();
    return deserialize(Webhook, webhook);
  }

  async editWebhook(uuid, rawWebhook): Promise<Webhook> {
    const webhook = await this.http.put<Webhook>(this.webhooksURL + uuid, rawWebhook).toPromise();
    return deserialize(Webhook, webhook);
  }

  async deleteWebhook(id): Promise<Webhook> {
    const webhook = await this.http.delete<Webhook>(this.webhooksURL + id).toPromise();
    return deserialize(Webhook, webhook);
  }

}
