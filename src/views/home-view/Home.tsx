import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useUserStore from "@/services/Store";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const currentuser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (Cookies.get("token") != "") {
      setIsLogged(true);
      console.log("logged!!");
      if (currentuser == null) {
        const token = Cookies.get("token");
        const dataFromToken = jwtDecode(token).user;
        setUser(dataFromToken);
        console.log("data_from_token", dataFromToken);
      }
      console.log("userGlobal: ", currentuser);
    }
  }, [currentuser]);

  return (
    <div>
      <h1>{currentuser?.username}</h1>
      {isLogged ? <h2>Usuario Logeado</h2> : <h2>Usuario no Logeado</h2>}
    </div>
  );
}
