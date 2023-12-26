/* eslint-disable no-unused-vars */

export interface Product {
  name: string;
  brand: string | null;
  categoryID: number;
  price: number | null;
  inStock: boolean;
  id: number;
}

export interface Category {
  name: string;
  id: number;
}

export interface CategoryState {
  categories: Category[];
}

export interface ProductsState {
  products: Product[];
}

export interface FilterState {
  isOpenFilterMenu: boolean;
  currentCategoryID: number | null;
  isFiltered: boolean;
}

export interface SortedMap {
  [key: string]: <T extends Product>(goods: T[]) => T[];
}

export interface SortValues {
  [key: string]: string;
}

export interface SortState {
  isOpenSortMenu: boolean;
  currentValue: string | number;
}

export interface ProductCardState {
  currentProduct: Product | null;
}

export interface MenuOpenHandlers {
  [key: string]: () => void;
}
