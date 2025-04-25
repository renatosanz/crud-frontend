import { searchRecipes } from "@/services/recipe-service";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

dayjs.locale(es);

export default function Search() {
  const { str } = useParams();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchRecipes = async () => {
      setResults(await searchRecipes(str));
    };
    if (Cookies.get("isLogged")) {
      getSearchRecipes().catch(console.error);
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <main className="h-screen flex w-screen flex-col">
      <div className="mx-auto flex flex-col p-5 rounded-2xl lg:w-7/12 lg:py-20 gap-5 md:8/12 w-11/12 sm:p-10">
        <header className="flex flex-row gap-5">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          {str === undefined ? (
            <h2>Todas las recetas</h2>
          ) : (
            <h2>Resultados de busqueda: {str}</h2>
          )}
        </header>
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Titulo</TableHead>
                <TableHead>Numero de ingredientes</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((recipe) => (
                <TableRow
                  className="cursor-pointer"
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <TableCell className="font-medium">{recipe.title}</TableCell>
                  <TableCell>
                    {recipe.num_ingredients + " ingrediente(s)"}
                  </TableCell>
                  <TableCell>{recipe.username}</TableCell>

                  <TableCell>
                    {dayjs(recipe.uploaded_at).format("MMMM D, YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {results.length + " resultado(s)"}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </div>
    </main>
  );
}
