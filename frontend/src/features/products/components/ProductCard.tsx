import { Button } from '@/UI/Elements/Button';
import { Card } from '@/UI/Elements/Card';
import { CardContent, CardHeader, CardTitle } from '@/UI/Elements/Card/Card';
import { Text } from '@/UI/Elements/Text';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from '@/UI/Elements/Dialog';
import { Product } from '@/features/products/store/products.type';
import { useDeleteProductMutation } from '../store/products.api';
import { ProductForm } from './ProductForm';
import { useUpdateProductMutation } from '../store/products.api';

export function ProductCard(product: Product) {
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  return (
    <Card
      className="my-4 w-full"
      data-testid="product-item"
    >
      <div className="flex flex-row items-center">
        <div className="basis-3/4">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={product.image_url} alt={product.name} className="w-32 h-32 object-cover mb-4" />
            <Text as="p" className="mb-2">Count: {product.count}</Text>
            <Text as="p" className="mb-2">Size: {product.size.width}x{product.size.height}</Text>
            <Text as="p" className="mb-2">Weight: {product.weight}kg</Text>
            {product.comments && product.comments.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Comments:</h4>
                <div className="space-y-2">
                  {product.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-2 rounded">
                      <p className="text-sm">{comment.description}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </div>
        <div className="mx-auto basis-1/4 text-center">
         
          <div className="flex flex-col gap-2">
          
            
            {/* Edit Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ProductForm isEditing 
                  defaultValues={product}
                  onSubmit={(data) => {
                    updateProduct({ id: product.id, body: data });
                  }}
                />
              </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {product.name}? This action cannot be undone.
                </DialogDescription>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => {
                    deleteProduct(product.id);
                  }}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
