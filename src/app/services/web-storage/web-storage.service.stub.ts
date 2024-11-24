import { StorageItem } from '../../types/types';

export class WebStorageServiceStub {
	public storage = new Map();

	public getItems(key: string): StorageItem[] {
		return this.storage.get(key) ?? [];
	}
	
	public setItems(key: string, data: StorageItem[]): void {
		this.storage.set(key, data);
	}
}
