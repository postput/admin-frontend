import {Injectable} from '@angular/core';
import tldjs from 'tldjs';

@Injectable({
  providedIn: 'root'
})
export class HostnameService {

  public current: any;

  constructor() {
    this.current = tldjs.parse(window.location.href);
  }


  get isLocalhost(): boolean {
    return this.current.hostname === 'localhost' || this.current.hostname === '127.0.0.1';
  }

  get url(): string {
    return window.location.protocol + '//' + this.current.hostname;
  }

  get canonicalHostname() {
    const a = this.current.hostname;
    return a.replace(/^(www\.)/, '').replace(/\./g, '-');
  }

}
