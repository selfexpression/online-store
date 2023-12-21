import { InitialState as DatabaseState } from '../slices/databaseSlice.ts';
import { InitialState as NavFilterState } from '../slices/navFilterSlice.ts';

export type Product = {
  name: string;
  brand: string | null;
  categoryID: number;
  price: number | null;
  inStock: boolean;
  id: number;
}

export type Database = Product[];

export type DatabaseStateType = {
  database: DatabaseState;
}

export type NavFilterStateType = {
  navFilter: NavFilterState;
}
