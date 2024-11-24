import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePhotosComponent } from './favourite-photos.component';

describe('FavoritePhotosComponent', () => {
  let component: FavouritePhotosComponent;
  let fixture: ComponentFixture<FavouritePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritePhotosComponent]
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
