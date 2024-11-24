import { Injectable } from '@angular/core';
import { IStorage, StorageItem } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService implements IStorage {

  public setItems(key: string, data: StorageItem[]): void {
    const dataToSave = JSON.stringify(data);
    localStorage.setItem(key, dataToSave);
  }
  
  public getItems(key: string): StorageItem[] {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return [];

    return JSON.parse(jsonData);
  }
}
