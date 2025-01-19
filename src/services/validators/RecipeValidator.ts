import { z } from "zod";
type Ingredient<id, value> = { id: id; value: value };

export const RecipeValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Nombre requerido." })
    .max(100, { message: "Nombre muy largo." }),
  description: z
    .string()
    .min(1, { message: "Descripcion requerida" })
    .max(400, { message: "Nota muy extensa!!!" }),
  uploaded_at: z.date({ message: "Fecha invalida." }),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});
