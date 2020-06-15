import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
