import React, { useEffect, useState } from "react";
import { useUserStore } from "@/services/UserStore";
import { getUserData } from "@/services/user-service";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  let current_user = useUserStore((state) => state.user);
  const set_user = useUserStore((state) => state.set_user);

  useEffect(() => {
    const fetchProtectedData = async () => {
      let user = await getUserData();
      if (user) {
        console.log("user: ", user);
        set_user(user);
        setIsLogged(true);
      }
    };
    fetchProtectedData().catch(console.error);
  }, []);

  return (
    <div>
      <h1>{isLogged ? current_user.username : "no_name"}</h1>
      {isLogged ? <h2>Usuario Logeado</h2> : <h2>Usuario no Logeado</h2>}
    </div>
  );
}
