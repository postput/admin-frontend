import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StorageService} from "../storage.service";
import {StorageType} from "../storage-type";
import {SnackbarService} from "../snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.less']
})
export class CreateStorageComponent implements OnInit, OnDestroy {

  storageTypes : StorageType[] = [];

  storageForm = this.fb.group({
    name: ['', Validators.required],
    typeId: [1, Validators.required],
    config: ['{}'],
    data: ['{}']
  });

  constructor(private fb: FormBuilder,
              public storageService: StorageService,
              private snackbarService: SnackbarService,
              private zone: NgZone,
              private router: Router) { }

  ngOnDestroy(): void {
  }

  async ngOnInit() {
    this.storageTypes = await this.storageService.getAllStorageTypes();
    const initialStorage = this.storageService.findStorageType(this.storageTypes, 1);
    this.storageForm.get('config').setValue(JSON.stringify(initialStorage.config, undefined, 4));

    this.storageForm.get('typeId').valueChanges.subscribe(typeId => {

      const newStorageType = this.storageService.findStorageType(this.storageTypes, typeId);

      this.storageForm.get('config').setValue(JSON.stringify(newStorageType.config, undefined, 4));
    });

  }

  async submit(){
    const rawStorage = this.storageForm.getRawValue();
    rawStorage.config = JSON.parse(rawStorage.config);
    try{
      const newStorage = await this.storageService.createStorage(rawStorage);

      this.zone.run(async () => {
        const snackbar = this.snackbarService.showSuccess('the storage "'+ newStorage.name +'" has been created!', 'See it!');
        const route = this.router.createUrlTree([ 'storages' ]);
        await this.router.navigateByUrl(route);
      } );

    }
    catch (e) {
      console.log('storage of that name already exists!')
    }

  }

}
