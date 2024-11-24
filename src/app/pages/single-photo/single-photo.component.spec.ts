import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePhotoComponent } from './single-photo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { ActivatedRouteStub, RouterStub } from '../../services/stubs';
import { WebStorageServiceStub } from '../../services/web-storage/web-storage.service.stub';


describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePhotoComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: WebStorageService, useClass: WebStorageServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
