import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/services/UserStore";
import { getUserData, logoutUser } from "@/services/user-service";
import dayjs from "dayjs";
import { HomeMenu } from "./HomeMenu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { getRecipes } from "@/services/recipe-service";
import { RecipeCard } from "./RecipeCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Home() {
  // navigate para redirigir a la pagina de login
  const navigate = useNavigate();

  // loggin/user control
  const [isLogged, setIsLogged] = useState(false);
  let user = useUserStore((state) => state.user);
  const set_user = useUserStore((state) => state.set_user);
  const set_recipes = useUserStore((state) => state.set_recipes);
  const recipes = useUserStore((state) => state.recipes);

  // save the current login to send it when a User logout
  const set_last_login = useUserStore((state) => state.set_last_login);
  const last_login = useUserStore((state) => state.last_login);

  useEffect(() => {
    const fetchProtectedData = async () => {
      let user = await getUserData();
      if (user) {
        set_user(user);
        let res = await getRecipes();
        console.log("first", res);
        set_recipes(res.recipes);
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

  const handleLogout = async () => {
    if (await logoutUser(last_login)) {
      navigate("/", { replace: true });
    }
  };

  const handleSearch = async () => {
    //TODO: crear las busquedas
  };

  return (
    <>
      <main className="h-screen flex w-screen flex-col">
        <div className="m-auto w-6/12 py-20 gap-5 flex flex-col p-5 rounded-2xl">
          <nav className="flex flex-row justify-between">
            <HomeMenu />
            <div className="flex flex-row gap-3">
              <Input placeholder="Buscar" onChange={handleSearch} />
              <Button variant="outline">
                <Search className="m-auto" />
              </Button>
            </div>
            <LogoutModal handleLogout={handleLogout}>
              <Button variant="destructive">
                <LogOut /> Logout
              </Button>
            </LogoutModal>
          </nav>
          <header className="flex flex-row gap-5 bg-zinc-100 rounded-2xl px-5 py-3">
            <div>
              {/* basic user info */}
              <h1>{isLogged ? user.username : "no_user"}</h1>
              {isLogged ? (
                <>
                  {user.last_login != null ? (
                    <h4>
                      Ultima sesión:{" "}
                      {dayjs(user.last_login).format("DD/MM/YYYY hh:mm:ss")}
                    </h4>
                  ) : (
                    <h3>Bienvenido</h3>
                  )}
                </>
              ) : (
                <h2>Usuario no Logeado</h2>
              )}
            </div>
            <div>
              <h3>Recetas publicadas</h3>
              <h1>{isLogged ? user.recipes_count : -1}</h1>
            </div>
          </header>
          <section>
            <h2>Tus Recetas</h2>
            <div className="grid grid-cols-2 gap-5 ">
              {recipes.map((e) => (
                <RecipeCard
                  title={e.title}
                  photo={"none"}
                  id={e.id}
                  key={e.title}
                  uploaded_at={e.uploaded_at}
                  description={e.description}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Toaster />
    </>
  );
}
