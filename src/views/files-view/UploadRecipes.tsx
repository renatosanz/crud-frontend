import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
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
import { RecipeSchema, uploadRecipe } from "@/services/recipe-service";
import { RecipeValidator } from "@/services/validators/RecipeValidator";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { FileQuestion, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = RecipeValidator;

export default function UploadRecipes() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // control form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: RecipeSchema(),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedFile) {
      toast.error("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("upload_date", dayjs(values.upload_date).toISOString());
    formData.append("image", selectedFile); // Añadimos el archivo al FormData

    console.log("formdata", formData);

    try {
      await uploadRecipe(formData);
      toast.success("Receta publicada!", {
        description: `Publicación exitosa "${values.title}"`,
      });
    } catch (error) {
      console.error("Error al subir la receta:", error);
      toast.error("Error al subir la receta.");
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("El archivo supera los 5 MB permitidos.");
        return;
      }
      setSelectedFile(file);
      const imgElement = document.getElementById(
        "img_selected"
      ) as HTMLImageElement;
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }

  return (
    <>
      <main className="h-screen flex w-screen">
        <div className="m-auto w-9/12 h-5/6 flex flex-col p-5 rounded-2xl">
          <h1 className="mb-5">Subir Receta</h1>
          <TooltipProvider>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <FormItem>
                  <FormLabel>
                    <p>Agrega una imagen del platillo</p>
                    <div className="flex flex-row">
                      <label
                        htmlFor="file-upload"
                        id="dropable-file"
                        className="aspect-square flex w-80 h-16 border-dashed border-4 cursor-pointer"
                      >
                        <div className="m-auto flex flex-row gap-2">
                          <FileUp /> <p>Click para examinar</p>
                        </div>
                      </label>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Tooltip>
                        <TooltipTrigger>
                          <FileQuestion className="m-auto ml-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Solo archivos de menos de 5 mb.</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <img
                          id="img_selected"
                          style={{
                            marginLeft: "1rem",
                            height: "60px",
                            width: "60px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </FormLabel>
                  <FormMessage />
                </FormItem>

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
                  {" " +
                    dayjs(form.getValues().upload_date).format("DD/MM/YYYY")}
                </p>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </TooltipProvider>
        </div>
      </main>
      <Toaster />
    </>
  );
}
