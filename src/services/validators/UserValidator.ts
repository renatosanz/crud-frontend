import { z } from "zod";

export const UserValidator =  z
.object({
  email: z.string().email({
    message: "Correo electrónico no válido.",
  }),
  username: z
    .string()
    .min(2, {
      message: "Nombre de usuario no válido.",
    })
    .max(20, { message: "Nombre de usuario demasiado largo." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
  password_validate: z
    .string()
    .min(8, {
      message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),
  country: z.string(),
})
.refine((data) => data.password === data.password_validate, {
  message: "Las contraseñas no coinciden.",
  path: ["password_validate"],
});