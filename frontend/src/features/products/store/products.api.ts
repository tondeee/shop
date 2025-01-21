import { Product } from '@/features/products/store/products.type';
import baseApi from '@/shared/store/api';

export const productApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Product'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getProducts: build.query<Product[], void>({
        query: () => 'products',
        providesTags: ['Product'],
      }),
      postProducts: build.mutation<Product, Partial<Product>>({
        query: (body) => ({
          url: 'products/',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Product'],
      }),
      updateProduct: build.mutation<Product, { id: string; body: Partial<Product> }>({
        query: ({ id, body }) => ({
          url: `products/${id}/`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Product'],
      }),
      deleteProduct: build.mutation<void, string>({
        query: (id) => ({
          url: `products/${id}/`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Product'],
      }),
    }),
    overrideExisting: false,
  });

export const { 
  useGetProductsQuery, 
  usePostProductsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation 
} = productApi;
