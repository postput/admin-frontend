import { Injectable } from '@angular/core';
import {deserialize} from "serializr";
import {Storage} from "./storage";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {StorageType} from "./storage-type";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storagesURL = this.api.getRoot('api') + 'storages/';
  private allStorageTypesURL = this.api.getRoot('api') + 'storage-types/';

  constructor(private http: HttpClient, private api: ApiService) {
  }

  async getAllStorages(): Promise<Storage[]> {
    const storages = await this.http.get<Storage[]>(this.storagesURL).toPromise();
    return deserialize(Storage, storages);
  }

  async getStorage(uuid): Promise<Storage> {
    const storage = await this.http.get<Storage>(this.storagesURL + uuid).toPromise();
    return deserialize(Storage, storage);
  }

  async getAllStorageTypes(): Promise<StorageType[]> {
    const storages = await this.http.get<StorageType[]>(this.allStorageTypesURL).toPromise();
    return deserialize(StorageType, storages);
  }

  async createStorage(rawStorage): Promise<Storage> {
    const storage = await this.http.post<Storage>(this.storagesURL, rawStorage).toPromise();
    return deserialize(Storage, storage);
  }

  async editStorage(uuid, rawStorage): Promise<Storage> {
    const storage = await this.http.put<Storage>(this.storagesURL + uuid, rawStorage).toPromise();
    return deserialize(Storage, storage);
  }

  async deleteStorage(uuid): Promise<Storage> {
    const storage = await this.http.delete<Storage>(this.storagesURL + uuid).toPromise();
    return deserialize(Storage, storage);
  }

  findStorageType(storageTypes : StorageType[], typeId){
    const storageType =  storageTypes.find(storageType => storageType.id === typeId);
    return storageType;
  }
}
