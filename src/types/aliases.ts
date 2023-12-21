import {
  CategoriesState, ProductsState, DatabaseState, NavFilterState,
} from './interfaces.ts';

export type Database = CategoriesState & ProductsState

export type DatabaseStore = {
  database: DatabaseState;
}

export type NavFilterStore = {
  navFilter: NavFilterState;
}
