import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ProductFormValues, productFormSchema } from "../store/products.type"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/UI/Elements/Form/form"
import { Input } from "@/UI/Elements/Input"
import { Button } from "@/UI/Elements/Button"

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void
  defaultValues?: Partial<ProductFormValues>
  isEditing?: boolean
}

export function ProductForm({ onSubmit, defaultValues, isEditing = false }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues || {
      name: "",
      imageUrl: "", // changed from image_url
      count: 0,
      size: { width: 0, height: 0 },
      weight: 0,
      comments: [""],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "comments"
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"  // changed from image_url
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="size.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`comments.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{index === 0 && "Comments"}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add a comment" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-8"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append("")}
          className="w-full"
        >
          Add Comment
        </Button>

        <Button type="submit">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  )
}
