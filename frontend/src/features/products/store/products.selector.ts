import { productApi } from '@/features/products/store/products.api';

import { createSelector } from '@reduxjs/toolkit';

export const getProductList = createSelector(
  productApi.endpoints.getProducts.select(),
  (result) => {
    if (result.status === 'fulfilled' && result.data) {
      return result.data;
    }
    return [];
  },
);
