import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { WeatherForecastApiService } from './weather-forecast-api.service';

describe('WeatherForecastApiService', () => {
  let service: WeatherForecastApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeatherForecastApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather forecast data', () => {
    const mockData = [
      {
        date: '2024-01-01',
        temperatureC: 25,
        temperatureF: 77,
        summary: 'Warm',
      },
    ];

    service.getForecast().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiURL}/WeatherForecast`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle errors', () => {
    service.getForecast().subscribe({
      error: (error: Error) => {
        expect(error.message).toContain('Error de la API');
      },
    });

    const req = httpMock.expectOne(`${environment.apiURL}/WeatherForecast`);
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });
});
