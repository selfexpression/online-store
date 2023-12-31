import { store } from '../slices/index.ts';

import type {
  FilterState,
  SortState,
  ProductCardState,
  NavbarState,
  Database,
  CartState,
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

export type CartSore = {
  cart: CartState;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
