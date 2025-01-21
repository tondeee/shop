import { Button } from '@/UI/Elements/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/UI/Elements/Dialog';
import { ProductForm } from '@/features/products/components/ProductForm';
import { usePostProductsMutation } from '@/features/products/store/products.api';

export function Header() {
  const [postProduct] = usePostProductsMutation();

  return (
    <header className="sticky top-0 z-40 w-full shadow">
      <nav className="flex w-full items-center justify-end gap-3 pb-3 pl-4 pr-4 pt-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ProductForm onSubmit={(data) => {
              postProduct(data);
            }}/>
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
