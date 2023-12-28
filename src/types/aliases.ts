import type {
  FilterState,
  SortState,
  ProductCardState,
  NavbarState,
  Database,
} from './interfaces.ts';

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

export type NavbarStore = {
  navbar: NavbarState;
}
