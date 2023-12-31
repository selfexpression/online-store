/* eslint-disable no-unused-vars */
import type { Product } from '../types/interfaces.ts';

export interface SortedMap {
  [key: string]: (products: Product[]) => Product[];
}

export const sortedMap: SortedMap = {
  toHighPrice: (products) => products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
  toLowPrice: (products) => products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)),
};

export const sortedByStock = (products: Product[]) => (
  products.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)));
