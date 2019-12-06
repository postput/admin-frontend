import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.less']
})
export class StorageComponent implements OnInit {

  constructor(private storageService : StorageService) {

  }

  async ngOnInit() {
     const t = await this.storageService.getAllStorages();
     console.log(t);
  }

}
