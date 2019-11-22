import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StorageComponent} from "./storage/storage.component";
import {ListStorageComponent} from "./list-storage/list-storage.component";
import {CreateStorageComponent} from "./create-storage/create-storage.component";
import {EditStorageComponent} from "./edit-storage/edit-storage.component";

const routes: Routes = [
  { path: 'storages', component: ListStorageComponent },
  { path: 'storages/create', component: CreateStorageComponent },
  { path: 'storages/edit/:uuid', component: EditStorageComponent },
  { path: '',   redirectTo: '/storages', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
