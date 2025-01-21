import { usersHandlers } from './users';
import { productHandlers } from '@/test/handlers/products';

export const handlers = [...usersHandlers, ...productHandlers];
