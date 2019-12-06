import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StorageModule} from "./storage/storage.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateStorageComponent } from './create-storage/create-storage.component';
import { EditStorageComponent } from './edit-storage/edit-storage.component';
import { ListStorageComponent } from './list-storage/list-storage.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from "@angular/material";
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from '@angular/material/input';
import { ListWebhookComponent } from './list-webhook/list-webhook.component';
import { EditWebhookComponent } from './edit-webhook/edit-webhook.component';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { MapPipe } from './map.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateStorageComponent,
    EditStorageComponent,
    ListStorageComponent,
    ConfirmationComponent,
    SnackbarComponent,
    ListWebhookComponent,
    EditWebhookComponent,
    CreateWebhookComponent,
    MapPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StorageModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule

  ],
  entryComponents: [ConfirmationComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
