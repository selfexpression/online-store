import { InitialState as DatabaseState } from '../slices/databaseSlice.ts';

export type Product = {
  name: string;
  brand: string | null;
  categoryID: number;
  price: number | null;
  inStock: boolean;
}

export type Database = Product[];

export type DatabaseStateType = {
  database: DatabaseState;
}
