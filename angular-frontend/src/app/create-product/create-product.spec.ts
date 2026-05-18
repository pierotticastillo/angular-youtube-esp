import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LaptopApiService } from '../core/services/laptop-api.service';
import { CreateProduct } from './create-product';

describe('CreateProduct', () => {
  let component: CreateProduct;
  let fixture: ComponentFixture<CreateProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProduct],
      providers: [
        provideRouter([]),
        {
          provide: LaptopApiService,
          useValue: {
            create: () => of({ id: 1, name: 'Test laptop' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
