import { z } from "zod";

export const UserValidator = z
  .object({
    email: z.string().email({
      message: "Email not valid.",
    }),
    username: z
      .string()
      .min(2, {
        message: "Username not valid.",
      })
      .max(20, { message: "Username too long." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    password_validate: z
      .string()
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      }),
    age: z.coerce
      .number()
      .nonnegative({ message: "Age not valid." })
      .min(18, { message: "You must be 18 or older." })
      .max(99, { message: "Age not valid." }),
    country: z.string(),
  })
  .refine((data) => data.password === data.password_validate, {
    message: "Passwords do not match.",
    path: ["password_validate"],
  });
