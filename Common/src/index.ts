import { z } from "zod";

export const signUpInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
export type SignUpInput = z.infer<typeof signUpInput>;

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type SignInInput = z.infer<typeof signInInput>;

export const blogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type BlogInput = z.infer<typeof blogInput>;

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string().uuid(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
