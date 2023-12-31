import type {
  FilterStore,
  DatabaseStore,
  SortStore,
  ProductCardStore,
  NavbarStore,
  CartSore,
} from '../types/aliases.ts';

export const getDatabaseState = (state: DatabaseStore) => state.database;

export const getFilterState = (state: FilterStore) => state.filter;

export const getSortState = (state: SortStore) => state.sort;

export const getProductCardState = (state: ProductCardStore) => state.productCard;

export const getNavbarState = (state: NavbarStore) => state.navbar;

export const getCartState = (state: CartSore) => state.cart;
