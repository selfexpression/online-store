import { SortedMap } from '../types/interfaces.ts';

export const sortedMap: SortedMap = {
  toHighPrice: (goods) => goods.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
  toLowPrice: (goods) => goods.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)),
};
