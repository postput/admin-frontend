import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StorageComponent} from "./storage.component";

const routes: Routes = [
  { path: 'storage', component: StorageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
