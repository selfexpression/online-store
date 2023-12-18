export type Product = {
  name: string;
  brand: string;
  id: number;
  price: number;
}

export type Data = {
  name: string;
  id: number;
  goods: Product[];
}
