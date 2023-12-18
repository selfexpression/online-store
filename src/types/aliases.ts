export type Product = {
  name: string;
  brand: string;
  id: number;
  price: number;
}

export type Database = {
  name: string;
  id: number;
  goods: Product[];
}
