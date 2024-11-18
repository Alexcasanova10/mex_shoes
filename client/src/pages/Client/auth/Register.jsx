import { useState } from "react";
import Layout from "../../../Layouts/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../../Redux/Actions/User";

export default function Register() {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
  const { loading, error, userInfo } = userRegisterReducer;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(name, email, password));
  };

  return (
    <>
      <Layout>
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <form className="max-w-sm  mt-14 mb-10 mx-auto" onSubmit={submitHandler}>

            <h1 class="text-3xl mb-7  dark:text-white">Registrarse</h1>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Recordarme
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7"
              >
                Crear Cuenta
              </button>


              <button type="button" class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium block w-full text-lg px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-gray-300 mb-2">
                <svg class="w-5 h-5 mr-2" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="#4285F4" d="M488 261.8c0-17.8-1.5-35.6-4.7-52.9H250.2v99.8h134.5c-5.8 30.2-23.1 55.8-49 73.2v60.8h79.2c46.2-42.6 73.1-105.5 73.1-180.9z"></path>
                  <path fill="#34A853" d="M250.2 508c65.6 0 120.6-21.8 160.8-59l-79.2-60.8c-23.7 16-54 25.7-81.5 25.7-62.6 0-115.7-42.5-134.6-99.5H26.4v62.5C66.8 455.6 153.8 508 250.2 508z"></path>
                  <path fill="#FBBC05" d="M115.5 304.5c-10.5-30.2-10.5-63.6 0-93.8v-62.5H26.4C-8.8 202.8-17.8 267 26.4 307.6l89.1-3.1z"></path>
                  <path fill="#EA4335" d="M250.2 104.6c34.7 0 66.3 12.1 91 34.9l67.9-66.5C376.2 40.8 314 8 250.2 8 153.8 8 66.8 60.4 26.4 140.6l89.1 61.1C135 147.1 187.5 104.6 250.2 104.6z"></path>
                </svg>
                Registrarse con Google
              </button>



            </form>
          </>
        )}
      </Layout>
    </>
  );
}
