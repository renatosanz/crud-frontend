import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import "./Login.css";
import PasswordInput from "../../partials/PasswordInput";

export default function Login() {
  const [email, setEmail] = useState("");

  return (
    <div className="h-screen flex w-screen bg-indigo-950">
      <div className="80vw w-4/12 flex m-auto rounded-md p-10 gap-4 flex-col">
        <h1 className="text-indigo-200 text-3xl font-bold underline m-auto">
          Login
        </h1>

        <FormControl variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            onChange={(e) => setEmail(e.currentTarget.title)}
          >
            email
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="email"
            type="email"
            autoComplete="email"
          />
        </FormControl>
        <PasswordInput placeholder={"contraseña"} />

        <Button variant="contained">Acceder</Button>
        <p className="text-indigo-200 text-sm mt-4">
          No tengo una cuenta.{" "}
          <a href="/register" className="text-indigo-400">
            Registrate.
          </a>
        </p>
      </div>
    </div>
  );
}
