import { IPhoto } from '../../types/types';
import { Observable, of } from 'rxjs';

export class MediaContentServiceStub {
	public getPhotosList(): Observable<IPhoto[]> {
		return of([]);
	}
}