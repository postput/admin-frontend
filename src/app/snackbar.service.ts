import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {SnackbarComponent} from "./snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showHTML(){
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ['success'];
    config.verticalPosition= 'top';
    config.horizontalPosition= 'center';
    return this.snackBar.openFromComponent(SnackbarComponent, config);
  }
  showSuccess(message: string, action?: string) {
    return this.show(message, 'success', action)
  }

  showError(message: string, action?: string) {
    return this.show(message, 'error', action)
  }

  show(message: string, type: string, action?: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [type];
    config.duration = 5000;
    config.verticalPosition= 'top';
    config.horizontalPosition= 'center';
    return this.snackBar.open(message, action , config);
  }
}
