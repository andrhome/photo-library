import { MediaContentService } from './media-content.service';
import { HttpClient } from '@angular/common/http';

describe('MediaContentService', () => {
  let service: MediaContentService;
  const httpClientStub = {} as HttpClient;

  beforeEach(() => {
    service = new MediaContentService(httpClientStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
