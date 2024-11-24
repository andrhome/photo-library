export interface IPhoto {
	id: string;
	title: string;
	src: string;
}

/** Existing storage data types */
export type StorageItem = IPhoto;

export interface IStorage {
	getItems: (key: string) => StorageItem[];
	setItems: (key: string, data: StorageItem[]) => void;
}
