import { Injectable } from '@angular/core';

@Injectable()
export class PagedataService {
  private pageData: Map<string, any> = new Map<string, any>();
  constructor() { }
  setPageData(key: string, data: any){
    this.pageData.set(key, data);
  }

  getPageData(key: string): any {
    return this.pageData.get(key);
  }
}
