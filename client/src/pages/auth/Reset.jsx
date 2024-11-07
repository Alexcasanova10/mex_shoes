import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layouts";
import { userLoginAction } from "../../Redux/Actions/User";
import { useState } from "react";

export default function Reset() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const userLoginReducer = useSelector((state) => state.userLoginReducer);

  const { loading, error } = userLoginReducer;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

//   meterle la logica con la api pa q jale el recuperar contrasñea!!
  return (
    <>
      <Layout>
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
      <form className="max-w-sm mt-14 mb-10 mx-auto h-5/6" onSubmit={submitHandler}>
           <p class="text-2xl mb-7 font-thin text-gray-900 dark:text-white">Ingresa el token de recuperación.</p> 
              <div className="mb-5">
                <input
                  type="text"
                  id="token"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Token"
                  required
                  value={email} //pendiente mover logica
                  onChange={(e) => setEmail(e.target.value)} //pdte mover lógica
                />
              </div>         

           <p class="text-2xl mb-7 font-thin text-gray-900 dark:text-white">Crea tu nueva contraseña</p> 
              <div className="mb-5">
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nueva contraseña"
                  required
                  value={email} //pendiente mover logica
                  onChange={(e) => setEmail(e.target.value)} //pdte mover lógica
                />
              </div>              

              <button type="submit" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-14"> 
                Enviar
              </button>

            </form>
          </>
        )}
      </Layout>
    </>
  );
}