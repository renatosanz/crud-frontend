import { z } from "zod";

export const RecipeValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Nombre requerido." })
    .max(20, { message: "Nombre muy largo." }),
  description: z
    .string()
    .min(1, { message: "Descripcion requerida" })
    .max(100, { message: "Nota muy extensa!!!" }),
  upload_date: z.date({ message: "Fecha invalida." }),
});
