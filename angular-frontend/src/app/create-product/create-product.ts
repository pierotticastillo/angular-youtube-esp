import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LaptopApiService } from '../core/services/laptop-api.service';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {
  private readonly formBuilder = inject(FormBuilder);
  private readonly laptopService = inject(LaptopApiService);
  private readonly router = inject(Router);

  isSaving = false;

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      Swal.fire({
        title: 'Validacion',
        text: 'Ingrese el nombre de la laptop.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f39c12',
      });
      return;
    }

    this.isSaving = true;
    const name = this.productForm.controls.name.value?.trim() ?? '';

    if (!name) {
      this.isSaving = false;
      this.productForm.markAllAsTouched();
      return;
    }

    this.laptopService.create({ name }).subscribe({
      next: (createdLaptop) => {
        this.isSaving = false;
        Swal.fire({
          title: 'Exito',
          text: `Laptop creada: ${createdLaptop.name}`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2ecc71',
        }).then(() => this.router.navigate(['/products']));
      },
      error: (error: Error) => {
        this.isSaving = false;
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
}
