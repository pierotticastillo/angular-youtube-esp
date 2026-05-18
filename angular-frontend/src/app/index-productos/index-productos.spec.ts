import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LaptopApiService } from '../core/services/laptop-api.service';
import { IndexProductos } from './index-productos';

describe('IndexProductos', () => {
  let component: IndexProductos;
  let fixture: ComponentFixture<IndexProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexProductos],
      providers: [
        provideRouter([]),
        {
          provide: LaptopApiService,
          useValue: {
            getAll: () => of([]),
            refresh: () => of([]),
            getById: () => of({ id: 1, name: 'Test laptop' }),
            delete: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
