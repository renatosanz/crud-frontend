import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight, Heart, HeartOff, PenBox, Trash } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "@/services/recipe-service";

export function RecipeCard({
  title,
  description,
  photo,
  id,
  uploaded_at,
  deleteCallback,
}) {
  const navigate = useNavigate();
  const [isFavorite, setisFavorite] = useState<boolean>(false);
  const handleAddFavorites = () => {
    // TODO: crear agregar a favoritos
    if (isFavorite) {
      setisFavorite(false);
    } else {
      setisFavorite(true);
    }
  };
  //TODO: crear borrar y editar recetas
  const handleDelete = async () => {
    deleteCallback(id);
    await deleteRecipe(id);
  };
  const handleEdit = () => {};
  return (
    <Card className="m-auto w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {dayjs(uploaded_at).format("DD/MM/YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            navigate(`/recipe/${id}`);
          }}
        >
          Ver <ArrowRight />
        </Button>
        <div className="flex gap-3">
          <Toggle onClick={handleAddFavorites} aria-label="Agregar a favoritos">
            {isFavorite ? <Heart color="#ff4049" /> : <HeartOff />}
          </Toggle>
          <DeletePostModal handleDelete={handleDelete}>
            <Button
              className="h-10 w-10"
              variant="destructive"
              aria-label="Borrar receta"
            >
              <Trash />
            </Button>
          </DeletePostModal>
          <Button
            className="h-10 w-10"
            variant="outline"
            onClick={handleEdit}
            aria-label="Editar receta"
          >
            <PenBox />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function DeletePostModal({ children, handleDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recipe?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this recipe is irreversible. Are you sure you want to
            delete it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-destructive"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
