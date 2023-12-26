import {
  ProductsState, FilterState, SortState, CategoryState, ProductCardState,
} from './interfaces.ts';

export type Database = ProductsState & CategoryState;

export type DatabaseStore = {
  database: Database;
}

export type FilterStore = {
  filter: FilterState;
}

export type SortStore = {
  sort: SortState;
}

export type ProductCardStore = {
  productCard: ProductCardState;
}
