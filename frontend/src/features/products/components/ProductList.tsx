import { SkeletonList } from '@/UI/Elements/Skeleton';
import { ProductCard } from './ProductCard';
import { ProductApi } from '../store';

export function ProductList() {
  const { data: products, isLoading } = ProductApi.useGetProductsQuery();

  if (isLoading) {
    return <SkeletonList className="py-8" />;
  }
  
  return products?.map((s) => (
    <ProductCard
      key={s.id}
      {...s}
    />
  ));
}
