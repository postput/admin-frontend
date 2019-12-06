import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStorageComponent} from './list-storage/list-storage.component';
import {CreateStorageComponent} from './create-storage/create-storage.component';
import {EditStorageComponent} from './edit-storage/edit-storage.component';
import {ListWebhookComponent} from './list-webhook/list-webhook.component';
import {CreateWebhookComponent} from './create-webhook/create-webhook.component';
import {EditWebhookComponent} from './edit-webhook/edit-webhook.component';

const routes: Routes = [
  { path: 'storages', component: ListStorageComponent },
  { path: 'storages/create', component: CreateStorageComponent },
  { path: 'storages/edit/:uuid', component: EditStorageComponent },
  { path: 'webhooks', component: ListWebhookComponent },
  { path: 'webhooks/create/:storageId', component: CreateWebhookComponent },
  { path: 'webhooks/edit/:id', component: EditWebhookComponent },
  { path: '',   redirectTo: '/storages', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
