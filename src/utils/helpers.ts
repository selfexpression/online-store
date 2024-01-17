/* eslint-disable no-unused-vars */
import type { TFunction } from 'i18next';

import type { Product, CartItem } from '../types/interfaces.ts';

export interface SortedMap {
  [key: string]: (products: Product[]) => Product[];
}

interface FormValues {
  firstname: string;
  phoneNumber: string;
}

export const sortedMap: SortedMap = {
  toHighPrice: (products) => products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
  toLowPrice: (products) => products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)),
};

export const sortedByStock = (products: Product[]) => (
  products.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)));

export const formatMessage = (message: string): string => {
  const lines = message.split('\n');
  const trimmedLines = lines.map((line) => line.trim());
  return trimmedLines.join('\n');
};

export const createOrderMessage = (
  formValues: FormValues,
  cartItems: CartItem[],
  total: number,
  t: TFunction,
): string => {
  const userInfo = `${t('cart.formFields.firstname')}: ${formValues.firstname}
  ${t('cart.formFields.phoneNumber')}: ${formValues.phoneNumber}`;

  const order = cartItems.map((item, index) => (
    `${index}: ${item.brand} ${item.name}
    Количество: ${item.quantity}`
  )).join('\n');

  return `${userInfo}
          Товары:
          ${order}
          Сумма заказа: ${total}`;
};
