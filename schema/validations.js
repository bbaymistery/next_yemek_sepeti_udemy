import { z } from "zod";

const baseUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  image: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  job: z.string().optional(),
  bio: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
});

export const userValidationSchema = baseUserSchema.refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const userUpdateValidationSchema = baseUserSchema.partial().refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const productValidationSchema = z.object({
  title: z.string().min(1, "Title is required").max(60, "Title must be less than 60 characters"),
  desc: z.string().min(1, "Description is required").max(300, "Description must be less than 300 characters"),
  prices: z.array(z.number()).nonempty("At least one price is required"),
  category: z.string().min(1, "Category is required"),
  img: z.string().min(1, "Image is required"),
  extraOptions: z.array(
    z.object({
      text: z.string().optional(),
      price: z.number().optional(),
    })
  ).optional(),
});

export const categoryValidationSchema = z.object({
  title: z.string().min(1, "Title is required").max(60, "Title must be less than 60 characters"),
});

export const orderValidationSchema = z.object({
  customer: z.string().min(1, "Customer name is required").max(100, "Customer name must be less than 100 characters"),
  address: z.string().min(1, "Address is required").max(200, "Address must be less than 200 characters"),
  total: z.number().min(0, "Total must be at least 0"),
  status: z.number().default(0).optional(),
  method: z.number().min(0, "Payment method is required"),
});
