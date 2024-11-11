import { useState } from "react";
import Layout from "../../Layouts/Layouts";
import { BASE_URL } from "../../Redux/Constants/BASE_URL";


export default function Reset() {
  // Estados para el token, la nueva contraseña y mensajes de estado
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la petición POST a tu API para resetear la contraseña
      const response = await fetch(`${BASE_URL}/api/reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Error al actualizar la contraseña");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <Layout>
      <form
        className="max-w-sm mt-14 mb-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl mb-7 font-thin text-gray-900 dark:text-white">
          Ingresa el token de recuperación.
        </p>
        <div className="mb-5">
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Token"
            required
          />
        </div>

        <p className="text-2xl mb-7 font-thin text-gray-900 dark:text-white">
          Crea tu nueva contraseña
        </p>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Nueva contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full text-lg px-5 py-2.5"
        >
          Enviar
        </button>

        {/* Mensaje de éxito o error */}
        {message && (
          <p className="text-green-500 mt-5">{message}</p>
        )}
        {error && (
          <p className="text-red-500 mt-5">{error}</p>
        )}
      </form>
    </Layout>
  );
}
