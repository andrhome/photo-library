import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLibraryComponent } from './photo-library.component';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { MediaContentService } from '../../services/media-content/media-content.service';
import { ChangeDetectorRef } from '@angular/core';
import { MediaContentServiceStub } from '../../services/media-content/media-content.service.stub';

describe('PhotoLibraryComponent', () => {
  let component: PhotoLibraryComponent;
  let fixture: ComponentFixture<PhotoLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoLibraryComponent],
      providers: [
        { provide: MediaContentService, useClass: MediaContentServiceStub },
        { provide: WebStorageService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
