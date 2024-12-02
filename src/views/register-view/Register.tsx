import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Eye, EyeClosed, Route } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "@/services/user-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryList from "@/components/CountryList";

// esquema de validacion del formulario
const formSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo valido.",
  }),
  username: z.string().min(2, {
    message: "Ingresa un correo valido.",
  }),
  password: z.string(),
  password_validate: z.string(),
  age: z.coerce
    .number()
    .nonnegative({ message: "Edad invalida." })
    .min(18, { message: "Debes ser mayor de edad." })
    .max(99, { message: "Edad invalida." }),
  country: z.string(),
});

export default function Register() {
  // navigate para redirigir a la pagina de login
  const navigate = useNavigate();

  // states de la visualizacion de los passwords
  const [showPassword01, setShowPassword01] = useState("password");
  const [showPassword02, setShowPassword02] = useState("password");

  // handlers para cambiar entre visible y no visible
  const handlePasswordShow01 = () => {
    if (showPassword01 === "password") {
      setShowPassword01("text");
    } else {
      setShowPassword01("password");
    }
  };

  const handlePasswordShow02 = () => {
    if (showPassword02 === "password") {
      setShowPassword02("text");
    } else {
      setShowPassword02("password");
    }
  };

  // control form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password_validate: "",
      age: 18,
      country: "",
    },
  });

  // una vez ya validado todo correctamente se envian los datos a la base de datos
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password == values.password_validate) {
      var newData = {
        username: values.username,
        password: values.password,
        age: values.age,
        email: values.email,
        country: values.country,
      };
      registerUser(newData);
      console.log("user registred: ", values);
      navigate("/", { replace: true });
    } else {
      // las contraseñas no coinciden
      console.log("password dismatch!! ", values);
    }
  }

  return (
    <main className="h-screen flex w-screen">
      <div className="80vw w-2/4 flex m-auto rounded-md p-10 flex-col gap-4 ">
        <h1 className=" text-3xl font-bold  m-auto ">Registrar</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-2/3 m-auto"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresa nombre de usuario</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* input de email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresa tu correo electronico.</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* input de edad */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresa tu edad</FormLabel>
                  <FormControl>
                    <Input
                      className="w-1/3"
                      minLength={2}
                      maxLength={3}
                      min={18}
                      max={99}
                      type="number"
                      placeholder="edad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* input de pais */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Pais de origen.</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {/* lista de paises */}
                        <CountryList />
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* inputs de contraseña y validacion de contraseña */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingresa una contraseña</FormLabel>
                  <div className="flex flex-row gap-2">
                    <FormControl>
                      <Input
                        type={showPassword01}
                        autoComplete="password"
                        placeholder="contraseña"
                        {...field}
                      />
                    </FormControl>
                    <Toggle
                      onClick={handlePasswordShow01}
                      aria-label="Toggle password"
                    >
                      {showPassword01 == "password" ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Toggle>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_validate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verifica tu contraseña</FormLabel>
                  <div className="flex flex-row gap-2">
                    <FormControl>
                      <Input
                        type={showPassword02}
                        autoComplete="password"
                        placeholder="contraseña"
                        {...field}
                      />
                    </FormControl>
                    <Toggle
                      onClick={handlePasswordShow02}
                      aria-label="Toggle password"
                    >
                      {showPassword02 == "password" ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Toggle>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los terminos y condiciones.
              </label>
            </div>

            <Button type="submit">Acceder</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
