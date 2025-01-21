import { Product } from './products.type';

export const productMockList: Product[] = [
  {
    id: 'prod1',
    imageUrl: 'https://example.com/image1.jpg',
    name: 'Product 1',
    count: 10,
    size: {
      width: 100,
      height: 200,
    },
    weight: 1.5,
    comments: [],
  },
  {
    id: 'prod2',
    imageUrl: 'https://example.com/image2.jpg',
    name: 'Product 2',
    count: 5,
    size: {
      width: 150,
      height: 300,
    },
    weight: 2.8,
    comments: [],
  },
  {
    id: 'prod3',
    imageUrl: 'https://example.com/image3.jpg',
    name: 'Product 3',
    count: 15,
    size: {
      width: 80,
      height: 120,
    },
    weight: 0.5,
    comments: [],
  },
];
