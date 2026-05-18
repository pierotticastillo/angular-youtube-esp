export interface Laptop {
  id: number;
  name: string;
}

export type CreateLaptopRequest = Pick<Laptop, 'name'>;

export type UpdateLaptopRequest = Pick<Laptop, 'id' | 'name'>;
