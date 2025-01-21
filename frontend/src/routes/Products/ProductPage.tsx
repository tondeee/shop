import { Container } from '@/UI/Elements/Container';
import { Text } from '@/UI/Elements/Text';
import { ProductList } from '@/features/products/components';

const ProductsPage =()  => {
  return (
    <Container>
      <Text
        size="7"
        as="p"
      >
        Products
      </Text>
      <ProductList />
    </Container>
  );
}

export default ProductsPage;
