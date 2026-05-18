import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, TimeoutError, catchError, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WeatherForecast } from '../models/weather-forecast.model';

const REQUEST_TIMEOUT_MS = 7000;

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastApiService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiURL}/WeatherForecast`;

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.url).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof TimeoutError) {
      return throwError(() => new Error('El servidor tardo demasiado en responder.'));
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return throwError(() => new Error('No se pudo conectar con la API. Verifique que el backend este iniciado.'));
      }

      return throwError(() => new Error(`Error de la API (${error.status}). Intente nuevamente.`));
    }

    return throwError(() => new Error('Ocurrio un error inesperado.'));
  }
}
