/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { registerAction } from "../../Redux/Actions/User";
import { useState } from "react";

const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };



 return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 lg:gap-y-12">
      <Card className="w-full max-w-lg p-8">
      <div className="flex justify-center mb-6">
          <img
            alt="Logo"
            src="https://github.com/Alexcasanova10/humansoft/blob/master/logomexshoes.jpg?raw=true"
            className="w-24"
          />
        </div>

        <h1 className="mb-6 text-2xl font-bold text-center dark:text-white md:text-3xl">
          Crea una cuenta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">


          
      

            <Label htmlFor="name">Nombre</Label>
            <TextInput
              placeholder="nombre"
              id="name"
              name="name"
              type="text"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Correo electrónico</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="nombre@empresa.com"
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
         
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Contraseña</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <div className="mb-7">
            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
            ¿Ya tienes una cuenta?&nbsp;
            <a href="/sign-in" className="text-primary-600 dark:text-primary-200">
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
