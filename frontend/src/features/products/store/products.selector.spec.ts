import { ProductSelectors } from '.';
import { productApi } from '@/features/products/store/products.api';
import { productMockList } from '@/features/products/store/products.mocks.spec';
import { Product } from '@/features/products/store/products.type';
import { setupStore } from '@/shared/store/test';

describe('Product Selector:', () => {
  let store;

  beforeEach(() => {
    store = setupStore();
  });

  it('Should return an empty list in case of no data', async () => {
    const data = [];

    await store.dispatch(
      productApi.util.upsertQueryData('getProducts', undefined, data),
    );

    expect(
      ProductSelectors.getProductList(store.getState()),
    ).toEqual(data);
  });

  it('Should return the full list of products', async () => {
    await store.dispatch(
      productApi.util.upsertQueryData(
        'getProducts',
        undefined,
        productMockList as Product[],
      ),
    );

    expect(
      ProductSelectors.getProductList(store.getState()),
    ).toEqual(productMockList);
  });
});
