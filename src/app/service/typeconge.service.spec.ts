import { TestBed } from '@angular/core/testing';

import { TypecongeService } from './typeconge.service';

describe('TypecongeService', () => {
  let service: TypecongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypecongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
