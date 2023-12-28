import { SortedMap, Product } from '../types/interfaces.ts';

export const sortedMap: SortedMap = {
  toHighPrice: (goods) => goods.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
  toLowPrice: (goods) => goods.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)),
};

export const sortedByStock = (goods: Product[]) => (
  goods.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)));
