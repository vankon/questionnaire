import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private prefix: string = 'qa_';

  constructor() {
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(this.prefix + key) as string);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
