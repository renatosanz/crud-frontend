import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/services/UserStore";
import { getUserData, logoutUser } from "@/services/user-service";
import dayjs from "dayjs";
import { HomeMenu } from "./HomeMenu";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function Home() {
  // navigate para redirigir a la pagina de login
  const navigate = useNavigate();
  // loggin/user control
  const [isLogged, setIsLogged] = useState(false);
  let user = useUserStore((state) => state.user);
  const set_user = useUserStore((state) => state.set_user);
  // save the current login to send it when a User logout
  const set_last_login = useUserStore((state) => state.set_last_login);
  const last_login = useUserStore((state) => state.last_login);

  useEffect(() => {
    const fetchProtectedData = async () => {
      let user = await getUserData();
      if (user) {
        console.log("user: ", user);
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

  const handleLogout = async() => {
    let res = await logoutUser(last_login)
    console.log('logout res: ', res)
    if (res) {
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="h-screen flex w-screen">
      <div className="m-auto w-9/12 h-5/6 gap-5 flex flex-col p-5 rounded-2xl">
        <nav className="flex flex-row justify-between">
          <HomeMenu />
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
            <h3>Capacidad de almacenamiento</h3>
            <h1>{isLogged ? user.storage_limit : -1} mb</h1>
          </div>
        </header>
      </div>
    </main>
  );
}
