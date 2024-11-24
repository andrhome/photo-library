import { StorageItem } from '../../types/types';

export class WebStorageServiceStub {
	public getItems(): StorageItem[] {
		return [];
	}
	
	public setItems(): void {
	}
}
