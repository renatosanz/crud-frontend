import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Cross, FileQuestion, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/services/UserStore";
import { getUserData } from "@/services/user-service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastAction } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { randomUUID } from "crypto";

const formSchema = RecipeValidator;

export default function UploadRecipes() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<
    { id: string; value: string }[]
  >([]);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  // Navegación para redirigir a la página de inicio de sesión
  const navigate = useNavigate();
  // Control de sesión del usuario
  const [isLogged, setIsLogged] = useState(false);
  let user = useUserStore((state) => state.user);
  const set_user = useUserStore((state) => state.set_user);
  // Guardar el inicio de sesión actual para usarlo al cerrar sesión
  const set_last_login = useUserStore((state) => state.set_last_login);
  const last_login = useUserStore((state) => state.last_login);

  useEffect(() => {
    const fetchProtectedData = async () => {
      let user = await getUserData();
      if (user) {
        set_user(user);
        setIsLogged(true);
      }
    };
    if (Cookies.get("isLogged")) {
      fetchProtectedData().catch(console.error);
      set_last_login(new Date());
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  // Control del formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: RecipeSchema(),
  });
  const addIngredient = () => {
    setIngredients([...ingredients, { id: crypto.randomUUID(), value: "" }]);
  };

  // Eliminar un ingrediente
  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    form.setValue(
      "ingredients",
      form.getValues().ingredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  // Actualizar un ingrediente
  const updateIngredient = (id: string, value: string) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, value } : ingredient
    );
    setIngredients(updatedIngredients);
    form.setValue("ingredients", updatedIngredients, {
      shouldValidate: true,
      shouldDirty: true,
    });
    console.log("ingredients", ingredients);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedFile) {
      toast.error("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("uploaded_at", dayjs(values.uploaded_at).toISOString());
    formData.append("user_id", user.user_id);
    formData.append("ingredients", JSON.stringify(values.ingredients));
    formData.append("image", selectedFile); // añadir el archivo de img

    try {
      let res = await uploadRecipe(formData);
      if (res.ok) {
        setButtonsDisabled(true);
        toast.success("Receta publicada!", {
          description: `Publicación exitosa "${values.title}"`,
          duration: 2500,
          action: <ToastAction altText="Ir a la receta">Ver</ToastAction>,
          onAutoClose: () => {
            navigate("/home", { replace: true });
          },
        });
      }
    } catch (error) {
      console.error("Error al subir la receta:", error);
      toast.error("Error al subir la receta.");
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 3 * 1024 * 1024) {
        toast.error("El archivo supera los 3 MB permitidos.");
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
        <div className="m-auto w-7/12 h-5/6 flex flex-col p-5 rounded-2xl">
          <h1 className="mb-5">Subir Receta</h1>
          <TooltipProvider>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 flex flex-row gap-10"
              >
                <div className="space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingresa el título de la receta</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Título"
                            autoComplete="off"
                            disabled={buttonsDisabled}
                            {...field}
                            max={20}
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
                            <FileUp /> <p>Haz clic para examinar</p>
                          </div>
                        </label>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          hidden
                          accept="image/*"
                          disabled={buttonsDisabled}
                          onChange={handleFileChange}
                        />
                        <Tooltip>
                          <TooltipTrigger>
                            <FileQuestion className="m-auto ml-5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Solo archivos de menos de 3 MB.</p>
                          </TooltipContent>
                        </Tooltip>
                        <div>
                          <img
                            id="img_selected"
                            style={{
                              marginLeft: "1rem",
                              height: "60px",
                              borderRadius: "1rem",
                              border: "#000 solid 1px ",
                              width: "100px",
                              objectFit: "contain",
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
                        <FormLabel>Preparación del platillo.</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-y"
                            {...field}
                            disabled={buttonsDisabled}
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
                      dayjs(form.getValues().uploaded_at).format("DD/MM/YYYY")}
                  </p>
                  <Button type="submit" disabled={buttonsDisabled}>
                    Enviar
                  </Button>
                </div>
                <div className="w-full">
                  <h2>Ingredientes</h2>
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center space-x-4 mb-2"
                    >
                      <Controller
                        name={`ingredients.${index}.value` as const}
                        control={form.control}
                        defaultValue={ingredient.value}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Ingrediente"
                            value={field.value}
                            autoComplete="off"
                            disabled={buttonsDisabled}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              updateIngredient(ingredient.id, e.target.value);
                            }}
                          />
                        )}
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        <Cross />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={addIngredient}>
                    Agregar Ingrediente
                  </Button>
                </div>
              </form>
            </Form>
          </TooltipProvider>
        </div>
      </main>
      <Toaster />
    </>
  );
}
