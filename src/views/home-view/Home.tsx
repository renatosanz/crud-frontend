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
import SearchBar from "./SearchBar";
import RandomMealBanner from "./RandomMealBanner";

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

  return (
    <>
      <main className="h-screen flex w-screen flex-col">
        <div className="mx-auto flex flex-col p-5 rounded-2xl lg:w-7/12 lg:py-20 gap-5 md:8/12 w-11/12 sm:p-10">
          <nav className="flex flex-row gap-3 justify-between">
            <HomeMenu />
            <div className="hidden sm:inline">
              <SearchBar />
            </div>
            <LogoutModal handleLogout={handleLogout}>
              <Button variant="destructive">
                <LogOut /> Logout
              </Button>
            </LogoutModal>
          </nav>
          <div className="inline sm:hidden ">
            <SearchBar />
          </div>
          <header className="justify-between flex flex-col sm:flex-row  dark:bg-gray-800 gap-5 bg-zinc-100 rounded-2xl px-5 py-3">
            <div>
              {/* basic user info */}
              <h1>{user?.username}</h1>
              {user?.last_login != null ? (
                <h4>
                  Last session:{" "}
                  {dayjs(user?.last_login).format("DD/MM/YYYY hh:mm")}
                </h4>
              ) : (
                <h3>Bienvenido</h3>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm m-auto">Recipes Posted</p>
              <h1 className="m-auto">{user?.recipes_count}</h1>
            </div>
          </header>
          <RandomMealBanner />
          <section className="dark:bg-gray-800 gap-5 bg-zinc-100  pb-3 rounded-xl">
            <h2 className="px-5 py-3">Your Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 px-5 pb-3  gap-5 ">
              {recipes.length > 0 ? (
                recipes.map((e: any) => (
                  <RecipeCard
                    title={e.title}
                    photo={"none"}
                    id={e.id}
                    key={e.title}
                    uploaded_at={e.uploaded_at}
                    description={e.description}
                  />
                ))
              ) : (
                <h4 className="px-5">Your posted recipes will show here.</h4>
              )}
            </div>
          </section>
        </div>
      </main>
      <Toaster />
    </>
  );
}
