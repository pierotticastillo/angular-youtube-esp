import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherForecast } from '../core/models/weather-forecast.model';
import { WeatherForecastApiService } from '../core/services/weather-forecast-api.service';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="weather-container">
      <h2>Weather Forecast</h2>

      <div *ngIf="loading">Loading weather data...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="forecasts.length > 0" class="forecast-grid">
        <div *ngFor="let forecast of forecasts" class="forecast-card">
          <h3>{{ forecast.date }}</h3>
          <p>Temperature: {{ forecast.temperatureC }}°C ({{ forecast.temperatureF }}°F)</p>
          <p>Summary: {{ forecast.summary }}</p>
        </div>
      </div>

      <div *ngIf="forecasts.length === 0 && !loading && !error" class="no-data">
        No weather forecast data available
      </div>

      <button (click)="refreshData()" class="refresh-button">Refresh Data</button>
    </div>
  `,
  styles: [`
    .weather-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }

    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .loading, .error, .no-data {
      text-align: center;
      padding: 1rem;
      margin: 1rem 0;
    }

    .error {
      color: #d32f2f;
      background-color: #ffebee;
      border-radius: 4px;
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .forecast-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .forecast-card h3 {
      margin-top: 0;
      color: #1976d2;
    }

    .refresh-button {
      display: block;
      margin: 1rem auto 0;
      padding: 0.5rem 1rem;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .refresh-button:hover {
      background-color: #1565c0;
    }
  `]
})
export class WeatherForecastComponent implements OnInit {
  private readonly weatherService = inject(WeatherForecastApiService);

  forecasts: WeatherForecast[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadForecastData();
  }

  loadForecastData(): void {
    this.loading = true;
    this.error = null;

    this.weatherService.getForecast().subscribe({
      next: (data) => {
        this.forecasts = data;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  refreshData(): void {
    this.loadForecastData();
  }
}
