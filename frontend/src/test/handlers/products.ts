import { productMockList } from '@/features/products/store/products.mocks.spec';
import { config } from '../config';
import { http, HttpResponse } from 'msw';

export const productHandlers = [
  http.get<any, any>(`${config.API_URL}/products/`, () => {
    try {
      return HttpResponse.json(productMockList);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 400 },
      );
    }
  }),
  http.post<any, any>(`${config.API_URL}/products/`, async ({ request }) => {
    try {
      const product = await request.json();
      return HttpResponse.json({
        ...product,
        id: crypto.randomUUID(),
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 400 },
      );
    }
  }),
  http.put<any, any>(`${config.API_URL}/products/:id/`, async ({ request, params }) => {
    try {
      const updates = await request.json();
      const { id } = params;
      

      return HttpResponse.json({
        ...updates,
        id,
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 400 },
      );
    }
  }),

  http.delete<any, any>(`${config.API_URL}/products/:id/`, ({ params }) => {
    try {
     
      return new HttpResponse(null, { status: 204 });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 400 },
      );
    }
  }),
];
