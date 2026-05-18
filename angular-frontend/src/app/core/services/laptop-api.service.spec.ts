import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LaptopApiService } from './laptop-api.service';

describe('LaptopApiService', () => {
  let service: LaptopApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LaptopApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
