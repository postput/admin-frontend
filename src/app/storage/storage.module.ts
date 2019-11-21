import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { StorageComponent } from './storage.component';
import {StorageRoutingModule} from "./storage-routing";



@NgModule({
  declarations: [StorageComponent],
  imports: [
    CommonModule,
    RouterModule,
    StorageRoutingModule
  ]
})
export class StorageModule { }
