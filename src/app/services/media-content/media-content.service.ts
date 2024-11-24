import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { IPhoto } from '../../types/types';

const RESPONSE_DELAY_MIN = 200;
const RESPONSE_DELAY_MAX = 300;

@Injectable({
  providedIn: 'root',
})
export class MediaContentService {
  private photosDataURL = 'assets/data.json';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Returns list of photo documents
   * @param {number} pageNumber - Number of the current page
   * @param {number} itemsPerPage - Count of documents per one page
   * @param {number} skipItems - Count of document that should be skipped per request
   */
  public getPhotosList(
    pageNumber: number,
    itemsPerPage: number,
    skipItems: number,
  ): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(this.photosDataURL, { responseType: 'json' })
      .pipe(
        delay(this.responseDelay),
        map((photos: IPhoto[]) => {
          const itemsCount = pageNumber * itemsPerPage;
          return photos.slice(skipItems, itemsCount);
        }),
      );
  }
  
  private get responseDelay(): number {
    return Math.random() * (RESPONSE_DELAY_MAX - RESPONSE_DELAY_MIN) + RESPONSE_DELAY_MIN;
  }
}
