import { Component, OnInit } from '@angular/core';
import {StorageType} from "../storage-type";
import {Storage} from "../storage";
import {StorageService} from "../storage.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-list-storage',
  templateUrl: './list-storage.component.html',
  styleUrls: ['./list-storage.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListStorageComponent implements OnInit {
  json = JSON;
  displayedColumns: string[] = ['id',  'uuid', 'type', 'name', 'actions'];
  expandedElement: Storage | null;
  storages : Storage[] = [];

  constructor(public storageService: StorageService, private router: Router, private dialog: MatDialog) { }

  async ngOnInit() {
    this.storages = await this.storageService.getAllStorages();
  }


  async onDelete(uuid){
    const dialog = this.dialog.open(ConfirmationComponent, {});

    dialog.afterClosed().subscribe(async confirm => {
      if (confirm) {
        const deleteStorage = await this.storageService.deleteStorage(uuid);
        await this.ngOnInit();
      }
    });
  }

  async onEdit(uuid){
    await this.router.navigate(['storages', 'edit', uuid]);
  }

}
