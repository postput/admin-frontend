import {Component, NgZone, OnInit} from '@angular/core';
import {StorageType} from "../storage-type";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {StorageService} from "../storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "../storage";
import {SnackbarService} from "../snackbar.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.less']
})
export class EditStorageComponent implements OnInit {

  uuid : String;
  storageTypes : StorageType[] = [];
  storage: Storage;

  storageForm = this.fb.group({
    name: ['', Validators.required],
    typeId: [1, Validators.required],
    config: ['{}'],
    data: ['{}']
  });

  constructor(private fb: FormBuilder,
              public storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackbarService,
              private zone: NgZone,
              private router: Router,
              public location: Location) { }


  initEmptyForm(form: AbstractControl, storage: Storage) {
    form.get('name').setValue(storage.name);
    form.get('typeId').setValue(storage.typeId);
    form.get('config').setValue(JSON.stringify(storage.config, undefined, 4));
    form.get('data').setValue(JSON.stringify(storage.data, undefined, 4));
  }

  async ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {
        this.uuid = params.uuid;
      });

    this.storageTypes = await this.storageService.getAllStorageTypes();
    this.storage = await this.storageService.getStorage(this.uuid);
    this.initEmptyForm(this.storageForm, this.storage);

    this.storageForm.get('typeId').valueChanges.subscribe(typeId => {

      const newStorageType = this.storageService.findStorageType(this.storageTypes, typeId);

      if (!this.storageForm.get('config').dirty) {
        this.storageForm.get('config').setValue(JSON.stringify(newStorageType.config, undefined, 4));
      }
    });

  }

  async submit(){
    const rawStorage = this.storageForm.getRawValue();
    rawStorage.config = JSON.parse(rawStorage.config) || {};
    try{
      const newStorage = await this.storageService.editStorage(this.uuid, rawStorage);

      this.zone.run(async () => {
        const snackbar = this.snackbarService.showSuccess('Your job has been well updated.', 'See it!');
        const route = this.router.createUrlTree([ 'storages' ]);
        await this.router.navigateByUrl(route);
      } );

    }
    catch (e) {
      console.log('storage of that name already exists!')
    }

  }
}
