import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowBigRight,
  ArrowRight,
  Heart,
  HeartIcon,
  HeartOff,
  Pen,
  PenBox,
  Trash,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import dayjs from "dayjs";

export function RecipeCard({ title, description, photo, id, uploaded_at }) {
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
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <Card className="m-auto w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {dayjs(uploaded_at).format("DD/MM/YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex justify-between">
        <Button>
          Ver <ArrowRight />
        </Button>
        <div className="flex gap-3">
          <Toggle onClick={handleAddFavorites} aria-label="Agregar a favoritos">
            {isFavorite ? <Heart color="#ff4049" /> : <HeartOff />}
          </Toggle>
          <Button
            className="h-10 w-10"
            variant="outline"
            onClick={handleDelete}
            aria-label="Borrar receta"
          >
            <Trash />
          </Button>
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
