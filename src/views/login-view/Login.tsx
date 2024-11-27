import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "./Login.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeClosed } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// esquema de validacion
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email({
      message: "Enter a valid email.",
    }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Login() {
  //estado para visualizar el password
  const [showPassword, setShowPassword] = useState("password");

  //
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handlePasswordShow = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  return (
    <main className="h-screen flex w-screen  ">
      <Card className="80vw w-1/4 flex m-auto p-5 flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Bienvenido</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row gap-2">
                      <FormControl>
                        <Input
                          type={showPassword}
                          autoComplete="password"
                          placeholder="Contraseña"
                          {...field}
                        />
                      </FormControl>
                      <Toggle
                        onClick={handlePasswordShow}
                        aria-label="Toggle password"
                      >
                        {showPassword == "password" ? (
                          <EyeClosed className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Toggle>
                    </div>
                    <FormMessage />
                    <FormDescription>
                      ¿No tiene una cuenta?{" "}
                      <a href="/register" className="font-bold">
                        Registrate.
                      </a>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit">Acceder</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
