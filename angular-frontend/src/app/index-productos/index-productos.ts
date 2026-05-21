import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Laptop } from '../core/models/laptop.model';
import { LaptopApiService } from '../core/services/laptop-api.service';

@Component({
  selector: 'app-index-productos',
  imports: [CommonModule],
  templateUrl: './index-productos.html',
  styleUrl: './index-productos.css',
})
export class IndexProductos implements OnInit {
  private readonly router = inject(Router);
  private readonly laptopService = inject(LaptopApiService);

  readonly laptops = signal<Laptop[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadLaptops();
  }

  loadLaptops(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.laptopService.getAll().subscribe({
      next: (laptops) => {
        this.laptops.set(laptops);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
      },
    });
  }

  onCreate(): void {
    this.router.navigate(['/products/create']);
  }

  onView(id: number): void {
    this.laptopService.getById(id).subscribe({
      next: (laptop) => {
        Swal.fire({
          title: laptop.name,
          text: `ID: ${laptop.id}`,
          icon: 'info',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3498db',
        });
      },
      error: (error: Error) => this.showError(error.message),
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  onDelete(laptop: Laptop): void {
    Swal.fire({
      title: 'Eliminar laptop',
      text: `Seguro que desea eliminar "${laptop.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.laptopService.delete(laptop.id).subscribe({
        next: () => {
          this.laptops.update((laptops) => laptops.filter((item) => item.id !== laptop.id));
          Swal.fire({
            title: 'Eliminada',
            text: 'La laptop se elimino correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2ecc71',
          });
        },
        error: (error: Error) => this.showError(error.message),
      });
    });
  }

  private showError(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#e74c3c',
    });
  }
}
