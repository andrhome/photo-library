import { TestBed } from '@angular/core/testing';

import { MediaContentService } from './media-content.service';

describe('MediaContentService', () => {
  let service: MediaContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
