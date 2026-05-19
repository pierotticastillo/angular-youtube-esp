import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, TimeoutError, catchError, map, of, tap, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateLaptopRequest, Laptop, UpdateLaptopRequest } from '../models/laptop.model';

const REQUEST_TIMEOUT_MS = 7000;

@Injectable({
  providedIn: 'root',
})
export class LaptopApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiURL}/api/laptops`;
  private laptopsCache: Laptop[] = [];

  getAll(): Observable<Laptop[]> {
    return this.request(this.http.get<unknown[]>(this.baseUrl)).pipe(
      map((response) => response.map((item) => this.toLaptop(item))),
      tap((laptops) => {
        this.laptopsCache = laptops;
      })
    );
  }

  getById(id: number): Observable<Laptop> {
    const cachedLaptop = this.laptopsCache.find((laptop) => laptop.id === id);

    if (cachedLaptop) {
      return of(cachedLaptop);
    }

    return this.request(this.http.get<unknown>(`${this.baseUrl}/${id}`)).pipe(map((response) => this.toLaptop(response)));
  }

  create(laptop: CreateLaptopRequest): Observable<Laptop> {
    return this.request(this.http.post<unknown>(this.baseUrl, laptop)).pipe(
      map((response) => this.toLaptop(response)),
      tap((createdLaptop) => {
        this.laptopsCache = [...this.laptopsCache, createdLaptop];
      })
    );
  }

  update(id: number, laptop: UpdateLaptopRequest): Observable<void> {
    return this.request(this.http.put<void>(`${this.baseUrl}/${id}`, laptop)).pipe(
      tap(() => {
        this.laptopsCache = this.laptopsCache.map((item) => (item.id === id ? { ...item, ...laptop } : item));
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.request(this.http.delete<void>(`${this.baseUrl}/${id}`)).pipe(
      tap(() => {
        this.laptopsCache = this.laptopsCache.filter((laptop) => laptop.id !== id);
      })
    );
  }

  refresh(): Observable<Laptop[]> {
    return this.getAll();
  }

  getCachedById(id: number): Laptop | undefined {
    return this.laptopsCache.find((laptop) => laptop.id === id);
  }

  private request<T>(source: Observable<T>): Observable<T> {
    return source.pipe(timeout(REQUEST_TIMEOUT_MS), catchError((error) => this.handleError(error)));
  }

  private toLaptop(value: unknown): Laptop {
    const laptop = value as { id?: unknown; Id?: unknown; name?: unknown; Name?: unknown };
    const id = Number(laptop.id ?? laptop.Id);
    const name = String(laptop.name ?? laptop.Name ?? '');

    return { id, name };
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof TimeoutError) {
      return throwError(() => new Error('El servidor tardo demasiado en responder.'));
    }

    if (error instanceof HttpErrorResponse) {
      const apiMessage = this.getApiErrorMessage(error);

      if (error.status === 0) {
        return throwError(() => new Error('No se pudo conectar con la API. Verifique que el backend este iniciado.'));
      }

      if (error.status === 404) {
        return throwError(() => new Error('No se encontro la laptop solicitada.'));
      }

      if (error.status === 409) {
        return throwError(() => new Error(apiMessage ?? 'Ya existe una laptop con esos datos.'));
      }

      if (error.status === 400) {
        return throwError(() => new Error(apiMessage ?? 'Los datos enviados no son validos.'));
      }

      return throwError(() => new Error(`Error de la API (${error.status}). Intente nuevamente.`));
    }

    return throwError(() => new Error('Ocurrio un error inesperado.'));
  }

  private getApiErrorMessage(error: HttpErrorResponse): string | null {
    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error && typeof error.error.message === 'string') {
      return error.error.message;
    }

    return null;
  }
}
