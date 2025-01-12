import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RecipeSchema } from "@/services/recipe-service";
import { RecipeValidator } from "@/services/validators/RecipeValidator";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { FileQuestion, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// esquema de validacion del formulario
const formSchema = RecipeValidator;

export default function UploadRecipes() {
  // control form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: RecipeSchema(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="h-screen flex w-screen">
      <div className="m-auto w-9/12 h-5/6 flex flex-col p-5 rounded-2xl">
        <h1 className="mb-5">Subir Receta</h1>
        <TooltipProvider>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingresa el titulo de la receta</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Titulo"
                        autoComplete="off"
                        {...field}
                        max={20}
                        className="w-1/4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p>Agrega una imagen del platillo</p>
                      <div className="flex flex-row">
                        <div
                          id="dropable-file"
                          className="aspect-square flex w-80 h-16 border-dashed border-4 cursor-pointer"
                        >
                          <div className="m-auto flex flex-row gap-2">
                            <FileUp /> <p>Click para examinar</p>
                          </div>
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <FileQuestion className="m-auto ml-5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Solo archivos de menos de 5 mb.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <input type="file" {...field} hidden />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion del platillo.</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none w-1/3"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Puedes describir el proceso para realizar el platillo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div id="preview-container"></div>
              <p>
                Fecha de subida:
                {" " + dayjs(form.getValues().upload_date).format("DD/MM/YYYY")}
              </p>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </TooltipProvider>
      </div>
    </main>
  );
}
