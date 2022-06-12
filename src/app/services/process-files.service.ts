import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessFilesService {
  
  private storage;
  
  constructor() {
    this.storage = new Map();
  }

  setParam(key:string, value:any){
    if (this.storage.has(key)){
      this.storage.delete(key);
    }
    this.storage.set(key,value);
    return this;
  }

  getParam(key:string){
    return this.storage.get(key);
  }


}
