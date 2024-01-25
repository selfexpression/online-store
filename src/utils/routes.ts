const apiRoutes = {
  sendMessage: () => '/send-message',
};

export const routes = {
  mainPage: () => '/',
  productPage: () => '/product/:productId',
  cartPage: () => '/cart',
  productLink: (id: number) => `/product/${id}`,
  sendMessageApi: () => apiRoutes.sendMessage(),
};
