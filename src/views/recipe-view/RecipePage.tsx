import { Button } from "@/components/ui/button";
import { environment } from "@/env";
import { getSingleRecipe } from "@/services/recipe-service";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      setRecipe(await getSingleRecipe(id));
    };
    if (Cookies.get("isLogged")) {
      getRecipe().catch(console.error);
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <main className="h-screen flex w-screen flex-col">
      <div className="mx-auto w-6/12 py-20 flex flex-col p-5 rounded-2xl">
        {recipe ? (
          <>
            <header className="flex flex-row gap-5">
              <Button onClick={() => navigate(-1)}>
                <ArrowLeft />
              </Button>
              <h2>{recipe.title}</h2>
            </header>
            <p>
              Publicado por <b>{recipe.User.username}</b>
              {` el ${dayjs(recipe.uploaded_at).format("MMMM D, YYYY")}`}
            </p>
            <section>
              {/*Lista de ingredientes */}
              <div className="grid mt-5 grid-cols-2 gap-5">
                <div>
                  <img
                    src={environment.url_api + "/images/" + recipe.img_name}
                    alt=""
                  />
                </div>
                <div>
                  <h3>Ingredientes</h3>
                  <ul className="ml-7">
                    {recipe.ingredients.map((e) => (
                      <li key={e.id} style={{ listStyleType: "square" }}>
                        {e.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <h3>Descripción</h3>
                <p style={{ textWrap: "wrap", wordBreak: "break-all" }}>
                  {recipe.description}
                </p>
              </div>
            </section>
          </>
        ) : (
          <>
            <p>Receta no disponible</p>
            <p>Descripción no disponible</p>
          </>
        )}
      </div>
    </main>
  );
}
