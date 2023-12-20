import { Product } from './aliases.ts';

export const isValidProduct = (product: Product): product is Product => {
  const {
    name, categoryID, brand, price, inStock, id,
  } = product;

  return (
    typeof name === 'string'
    && typeof categoryID === 'number'
    && (typeof brand === 'string' || brand === null)
    && (typeof price === 'number' || price === null)
    && typeof inStock === 'boolean'
    && typeof id === 'number'
  );
};
