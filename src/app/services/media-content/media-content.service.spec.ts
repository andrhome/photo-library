import { MediaContentService } from './media-content.service';
import { IPhoto } from '../../types/types';
import { Observable, of } from 'rxjs';

const photosListMock: IPhoto[] = [
  { id: '001', title: 'Image 1', src: 'https://fastly.picsum.photos/id/389/200/300.jpg?hmac=XjGcjYBMJ1aWzqOK5SWp_oZ2nU6KgS1PPzuQXJvRcJ4' },
  { id: '002', title: 'Image 2', src: 'https://fastly.picsum.photos/id/445/200/300.jpg?hmac=7dfJBQTfK8boCS5_EXpFW8SC_8VKMgDw5yFInpEee4s' },
  { id: '003', title: 'Image 3', src: 'https://fastly.picsum.photos/id/959/200/300.jpg?hmac=q2WZ7w-aqWQyUVa4vEv-28yCS6TLS-M19or3y7YVvso' },
  { id: '004', title: 'Image 4', src: 'https://fastly.picsum.photos/id/85/200/300.jpg?hmac=_MELEMGQCalX-bflh-qD89Z5VjdVMfVXD68WblQSLM8' },
  { id: '005', title: 'Image 5', src: 'https://fastly.picsum.photos/id/819/200/300.jpg?hmac=QrFu2y-FbDRBR4OFiSYDWP-w2egSTjiMkeagJb0rqM0' },
  { id: '006', title: 'Image 6', src: 'https://fastly.picsum.photos/id/61/200/300.jpg?hmac=4gnmCaXyXsOzE8pxb43yUtdfZnVbnUSGdPaJdh-aCUo' },
  { id: '007', title: 'Image 7', src: 'https://fastly.picsum.photos/id/377/200/300.jpg?hmac=veEWg3ApI7rkKqMF6MuaWBmxPgnEe-Ar9eDdMG3q-kk' },
  { id: '008', title: 'Image 8', src: 'https://fastly.picsum.photos/id/275/200/300.jpg?hmac=cSMNzJnIBeocVhMi8311gzgp4ZylFL2LlsUWtqobTEs' },
  { id: '009', title: 'Image 9', src: 'https://fastly.picsum.photos/id/986/200/300.jpg?hmac=uk_NL7rXttZ_ISvqJ3g_aV8Z_hQMxNLaABWXMHESj2Q' },
  { id: '010', title: 'Image 10', src: 'https://fastly.picsum.photos/id/548/200/300.jpg?hmac=dXVAc-s_U8QgoYUrMld43VmrOby1cluk-akWgxY6b9Y' },
];

class HttpClientStub {
  public get(): Observable<IPhoto[]> {
    return of(photosListMock);
  }
}

describe('MediaContentService', () => {
  let service: MediaContentService;
  const httpClientStub = new HttpClientStub() as any;

  beforeEach(() => {
    service = new MediaContentService(httpClientStub);
  });

  describe('FEATURE: Testing the fetch photos list functionality', () => {
    it(`WHEN: system runs the "getPhotosList" method for the page 1
    and requests 2 items per page without skipped items
    THEN: it returns the photo documents number 1 and 2`, (done) => {
      const pageNumber = 1;
      const itemsPerPage = 2;
      const skipItems = 0;
      
      const expectedDocsCount = 2;

      service.getPhotosList(
        pageNumber,
        itemsPerPage,
        skipItems,
      ).subscribe(photos => {
        expect(photos.length).toEqual(expectedDocsCount);
        expect(photos[0]).toEqual(photosListMock[0]);
        expect(photos[1]).toEqual(photosListMock[1]);
        done();
      });
    });
    
    it(`WHEN: system runs the "getPhotosList" method for the page 3
    and requests 2 items per page with 4 skipped items
    THEN: it returns the photo documents number 5 and 6`, (done) => {
      const pageNumber = 3;
      const itemsPerPage = 2;
      const skipItems = 4;
      
      const expectedDocsCount = 2;
      
      service.getPhotosList(
        pageNumber,
        itemsPerPage,
        skipItems,
      ).subscribe(photos => {
        expect(photos.length).toEqual(expectedDocsCount);
        expect(photos[0]).toEqual(photosListMock[4]);
        expect(photos[1]).toEqual(photosListMock[5]);
        done();
      });
    });
  });
});
