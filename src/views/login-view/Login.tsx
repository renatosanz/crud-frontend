import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

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
import { Eye, EyeClosed } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUser } from "@/services/user-service";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// esquema de validacion
const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Login() {
  const navigate = useNavigate();
  //estado para visualizar el password
  const [showPassword, setShowPassword] = useState("password");

  useEffect(() => {
    if (Cookies.get("isLogged") == "true") {
      navigate("/home", { replace: true });
    }
  }, []);

  // handler para cambiar entre visible y no visible
  const handlePasswordShow = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  // crear un form control
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (await loginUser(values)) {
      navigate("/home", { replace: true });
      
    } else {
      toast("Login fallido!",{
        description: "Usuario o contraseña erroneas",
      });
    }
  }

  return (
    <>
      <main className="h-screen flex w-screen">
        <Card className="md:w-2/4 lg:w-1/3 flex m-auto p-5 flex-col">
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
                  name="email"
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
      <Toaster />
    </>
  );
}
