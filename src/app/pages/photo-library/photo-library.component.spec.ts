import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLibraryComponent } from './photo-library.component';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { MediaContentService } from '../../services/media-content/media-content.service';
import { ChangeDetectorRef } from '@angular/core';
import { MediaContentServiceStub } from '../../services/media-content/media-content.service.stub';
import { WebStorageServiceStub } from '../../services/web-storage/web-storage.service.stub';
import { IPhoto } from '../../types/types';
import { AvailableStorageKeys } from '../../types/enums';
import { findItemById } from '../../common/utils';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const photosListMock: IPhoto[] = [
  { id: '001', title: 'Image 1', src: 'https://fastly.picsum.photos/id/389/200/300.jpg?hmac=XjGcjYBMJ1aWzqOK5SWp_oZ2nU6KgS1PPzuQXJvRcJ4' },
  { id: '002', title: 'Image 2', src: 'https://fastly.picsum.photos/id/445/200/300.jpg?hmac=7dfJBQTfK8boCS5_EXpFW8SC_8VKMgDw5yFInpEee4s' },
  { id: '003', title: 'Image 3', src: 'https://fastly.picsum.photos/id/959/200/300.jpg?hmac=q2WZ7w-aqWQyUVa4vEv-28yCS6TLS-M19or3y7YVvso' },
  { id: '004', title: 'Image 4', src: 'https://fastly.picsum.photos/id/85/200/300.jpg?hmac=_MELEMGQCalX-bflh-qD89Z5VjdVMfVXD68WblQSLM8' },
];

const STORAGE_DATA_KEY = AvailableStorageKeys.FavoritePhotos;

describe('PhotoLibraryComponent', () => {
  let component: PhotoLibraryComponent;
  let fixture: ComponentFixture<PhotoLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoLibraryComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MediaContentService, useClass: MediaContentServiceStub },
        { provide: WebStorageService, useClass: WebStorageServiceStub },
        { provide: ChangeDetectorRef, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    component.photos = photosListMock;
  });

  describe('FEATURE: Testing Add to Favourites functionality', () => {
    beforeEach(() => {
      // Clear the storage before each test
      component.webStorage.setItems(STORAGE_DATA_KEY, []);
    });

    it(`WHEN: the system trys to add some photo by not existing id to the favourites list
    THEN: the save photo to the storage process will not be run`, () => {
      const notExistingPhotoId = 'test-photo';
      const setItemsSpy = spyOn(component.webStorage, 'setItems');
      
      component.addToFavourite(notExistingPhotoId);

      expect(setItemsSpy).not.toHaveBeenCalled();
    });

    it(`WHEN: user adds some existing photo to the favourites list
    THEN: this photo should be saved in the storage`, () => {
      const setItemsSpy = spyOn(component.webStorage, 'setItems');
      const photoId = photosListMock[1].id;
      
      component.addToFavourite(photoId);
      
      const favouritePhotos = component.webStorage.getItems(STORAGE_DATA_KEY);
      const addedFavouritePhoto = findItemById(favouritePhotos, photoId);
      
      expect(setItemsSpy).toHaveBeenCalled();
      expect(addedFavouritePhoto?.id).toEqual(photoId);
    });
    
    it(`WHEN: user trys to add the same photo a few times to the favourites list
    THEN: the photo should be added to the storage only once`, () => {
      const photoId = photosListMock[0].id;
      
      // The first time adding the photo
      component.addToFavourite(photoId);
      // The second time adding the photo
      component.addToFavourite(photoId);
      
      const favouritePhotos = component.webStorage.getItems(STORAGE_DATA_KEY);
      const addedFavouritePhotos = favouritePhotos.filter(photo => photo.id === photoId);
      
      expect(addedFavouritePhotos.length).toEqual(1);
    });
  });
});
