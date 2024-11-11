import { useDispatch } from "react-redux";
import Layout from "../../Layouts/Layouts";
import { useState } from "react";
import { userPasswordResetAction } from "../../Redux/Actions/User.js";


export default function Recuperar() {
  const [email, setEmail] = useState(null);
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
        alert("Por favor, ingresa un correo electrónico.");
        return;
    }
    
    // Llama a la acción para enviar el correo de recuperación
    dispatch(userPasswordResetAction(email));
};
 

//   meterle la logica con la api pa q jale el recuperar contrasñea!!
  return (
    <>
      <Layout>

          <>
       <form className="max-w-sm mt-14 mb-10 mx-auto h-5/6"  onSubmit={handleSubmit}>
          <h1 class="text-3xl mb-7  dark:text-white">Recuperar tu cuenta</h1>
          <p class="text-2xl mb-7 font-thin text-gray-900 dark:text-white">Ingresa tu correo electrónico para obtener un token de recuperación.</p> 
              <div className="mb-5">
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>              

              <button type="submit" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-14"> 
                Enviar
              </button>

            </form>
          </>
       </Layout>
    </>
  );
}