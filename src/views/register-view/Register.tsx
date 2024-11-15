import React, { useState } from "react";
import { registerUser } from "../../services/user-service";
import InputText from "../../partials/InputText";
import { Button } from "@mui/material";

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  let dumbdata = {
    id: 2,
    name: "Michael JK",
    email: "michaejk@correo.com",
    age: 33,
    city: "NY",
    balance: 22132,
  };

  return (
    <div className="h-screen flex w-screen bg-indigo-950">
      <div className="80vw w-4/12 flex m-auto rounded-md p-10 flex-col gap-4">
        <h1 className="text-indigo-200 text-3xl font-bold underline m-auto ">
          Registrar
        </h1>
        <h3 className="text-indigo-200">Ingresa tus datos</h3>
        <InputText autocomplete="name" placeholder="nombre" onChangeFn = {setFirstName}/>
        <InputText autocomplete="email" placeholder="email" onChangeFn = {setFirstName}/>
        <InputText type="number" placeholder="edad" onChangeFn = {setFirstName}/>
        <InputText type="country" placeholder="pais" />
        <InputText type="city" placeholder="ciudad" />
        <Button variant="contained" onClick={() => registerUser(dumbdata)}>
          Acceder
        </Button>
      </div>
    </div>
  );
}
