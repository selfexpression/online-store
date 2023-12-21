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
}

export interface CategoriesState {
  categories: Category[];
}

export interface ProductsState {
  products: Product[];
}

export interface NavFilterState {
  isOpenFilterMenu: boolean;
}

export interface DatabaseState {
  categories: Category[];
  products: Product[];
}
