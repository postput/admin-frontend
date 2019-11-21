import { Injectable } from '@angular/core';
import {HostnameService} from "./hostname.service";
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  roots = {
    api: environment.api_endpoint
  };

  ports = {
    api: environment.api_port
  };

  constructor(
    private hostnameService: HostnameService
  ) {}

  get root(): string {
    const port = this.port;
    if (port === null) {
      return this.hostnameService.url + '/';
    }
    return this.hostnameService.url + ':' + port + '/';
  }

  get port(): string {
    if (this.hostnameService.isLocalhost) {
      return '2000';
    }
    return null;
  }


  getRoot(type: string){
    if ( !this.hostnameService.isLocalhost ){
      return this.roots[type] + '/';
    }
    else{
      const port = this.ports[type];
      return this.hostnameService.url + ':' + port + '/';
    }
  }


}
