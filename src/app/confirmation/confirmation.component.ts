import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {

  data: any = {};

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public providedData: any) {
    this.data = providedData || {};
    this.data.title = this.data.title || 'Alert';
    this.data.content = this.data.content || 'Are you sure you want to delete this storage?';

  }

  ngOnInit() {
    this.dialogRef.updateSize('600px');
  }
}
