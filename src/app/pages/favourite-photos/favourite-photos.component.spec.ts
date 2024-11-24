import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePhotosComponent } from './favourite-photos.component';
import { Router } from '@angular/router';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { WebStorageServiceStub } from '../../services/web-storage/web-storage.service.stub';

describe('FavoritePhotosComponent', () => {
  let component: FavouritePhotosComponent;
  let fixture: ComponentFixture<FavouritePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritePhotosComponent],
      providers: [
        { provide: WebStorageService, useClass: WebStorageServiceStub },
        { provide: Router, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
