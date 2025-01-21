import { z } from "zod"

export enum ProductType {
  Subscription = 'subscription',
  OneTimePurchase = 'oneTimePurchase',
}

export interface Comment {
  id: string;
  productId: string;
  description: string;
  date: string;
}

export interface Product {
  id: string;
  imageUrl: string; // changed from image_url
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: number;
  comments: Comment[];
}

// Form schema for internal form handling
export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Must be a valid URL"), // changed from image_url
  count: z.number().min(0, "Count must be positive"),
  size: z.object({
    width: z.number().min(0, "Width must be positive"),
    height: z.number().min(0, "Height must be positive"),
  }),
  weight: z.number().min(0, "Weight must be positive"),
  comments: z.array(z.string()),
})

// Type for the form values (flat structure)
export type ProductFormValues = z.infer<typeof productFormSchema>;

// Type for the transformed data (matches API structure)
export type ProductPayload = Omit<ProductFormValues, 'width' | 'height'> & {
  size: {
    width: number;
    height: number;
  };
};


