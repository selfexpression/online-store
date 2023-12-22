import {
  CategoriesState, ProductsState, DatabaseState, FilterState, SortState,
} from './interfaces.ts';

export type Database = CategoriesState & ProductsState

export type DatabaseStore = {
  database: DatabaseState;
}

export type FilterStore = {
  filter: FilterState;
}

export type SortStore = {
  sort: SortState;
}
