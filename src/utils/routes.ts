export const serverApiRoutes = {
  sendMessage: () => '/send-message',
};

export const firebaseApiRoutes = {
  carts: () => 'carts',
  productImagesApi: (id: number) => `product-images/${id}.jpg`,
  categories: () => 'categories',
  products: () => 'products',
};

export const routes = {
  mainPage: () => '/',
  productPage: () => '/product/:productId',
  cartPage: () => '/cart',
  productLink: (id: number) => `/product/${id}`,
};
