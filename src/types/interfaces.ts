/* eslint-disable no-unused-vars */
export interface Product {
  name: string;
  brand: string | null;
  categoryID: number;
  price: number | null;
  inStock: boolean;
  id: number;
  imageURL: string;
}

export interface Category {
  name: string;
  id: number;
}

export interface ProductCategoryData {
  categories: Category[];
  products: Product[];
}

export interface DatabaseState extends ProductCategoryData {
  filteredProducts: Product[];
}

export interface MenuOpenHandlers {
  [key: string]: () => void;
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number | null;
}
