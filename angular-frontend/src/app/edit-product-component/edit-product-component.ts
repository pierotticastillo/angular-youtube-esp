import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Laptop } from '../core/models/laptop.model';
import { LaptopApiService } from '../core/services/laptop-api.service';

@Component({
  selector: 'app-edit-product-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
})
export class EditProductComponent implements OnInit {
  @Input() id?: string;

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly laptopService = inject(LaptopApiService);

  readonly editForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly error = signal<string | null>(null);

  private laptopId = 0;

  ngOnInit(): void {
    const parsedId = Number(this.id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      this.error.set('ID de laptop no valido.');
      this.isLoading.set(false);
      return;
    }

    this.laptopId = parsedId;
    this.loadLaptop();
  }

  loadLaptop(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.laptopService.getById(this.laptopId).subscribe({
      next: (laptop) => {
        this.setLaptop(laptop);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      Swal.fire({
        title: 'Validacion',
        text: 'Ingrese el nombre de la laptop.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f39c12',
      });
      return;
    }

    this.isSaving.set(true);
    const name = this.editForm.controls.name.value?.trim() ?? '';

    if (!name) {
      this.isSaving.set(false);
      this.editForm.markAllAsTouched();
      return;
    }

    this.laptopService.update(this.laptopId, { name }).subscribe({
      next: () => {
        this.isSaving.set(false);
        Swal.fire({
          title: 'Exito',
          text: 'Laptop actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2ecc71',
        }).then(() => this.router.navigate(['/products']));
      },
      error: (error: Error) => {
        this.isSaving.set(false);
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#e74c3c',
        });
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  private setLaptop(laptop: Laptop): void {
    this.editForm.patchValue({ name: laptop.name });
    this.isLoading.set(false);
    this.error.set(null);
  }
}
