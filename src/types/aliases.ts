import {
  ProductsState, FilterState, SortState,
} from './interfaces.ts';

export type Database = ProductsState;

export type DatabaseStore = {
  database: ProductsState;
}

export type FilterStore = {
  filter: FilterState;
}

export type SortStore = {
  sort: SortState;
}
