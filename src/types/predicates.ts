import { Database, Product } from './aliases.ts';

export const isValidProduct = (product: Product): product is Product => {
  const {
    name, id, brand, price,
  } = product;

  return (
    typeof name === 'string'
    && typeof id === 'number'
    && typeof brand === 'string'
    && typeof price === 'number'
  );
};

export const isValidData = (data: Database): data is Database => {
  const { name, id, goods } = data;

  return (
    typeof name === 'string'
    && typeof id === 'number'
    && Array.isArray(goods)
    && goods.every((item) => isValidProduct(item))
  );
};
