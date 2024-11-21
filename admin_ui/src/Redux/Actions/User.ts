import { Dispatch } from "redux";
import { redirect } from "react-router";
import api from "../Constants/api"; // Importa tu instancia de fetch configurada si tienes una
import { createAsyncThunk } from '@reduxjs/toolkit';

// Tipos de acción
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_AUTH_FAILURE = "USER_AUTH_FAILURE";

// Acción para el login
// export const loginAction = (email: string, password: string) => async (dispatch: Dispatch) => {
//   try {
//     const response = await fetch(`${api}/api/admin/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       const msg = error.message;
//       throw new Error( `error es ${msg}`  );
//     }

//     const data = await response.json();

//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
//     localStorage.setItem("userInfo", JSON.stringify(data)); // Guardar en localStorage

//     // Redirigir al dashboard si el login es exitoso
//     redirect("/dashboard");
//   } catch (error: any) {
//     dispatch({ type: USER_AUTH_FAILURE, payload: error.message });
//     alert("Error de autenticación: " + error.message);
//   }
// };
// export const loginAction = (email: string, password: string) => async (dispatch: Dispatch) => {
//   try {
//     const response = await fetch(`${api}/api/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message);

//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
//     localStorage.setItem("userInfo", JSON.stringify(data));
//     window.location.href = "/dashboard"; // Redirige manualmente al dashboard
//   } catch (error: any) {
//     dispatch({ type: USER_AUTH_FAILURE, payload: error.message });
//     alert("Error al iniciar sesión: " + error.message);
//   }
// };


export const loginAction = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    // Realiza la solicitud POST con axios
    const response = await api.post("/api/admin/login", { email, password });

    // Despacha el éxito con los datos de la respuesta
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });

    // Guarda la información del usuario en localStorage
    localStorage.setItem("userInfo", JSON.stringify(response.data));

    // Redirige manualmente al dashboard
    window.location.href = "/dashboard"; 
  } catch (error: any) {
    // Si hay un error, despacha el fallo
    dispatch({ type: USER_AUTH_FAILURE, payload: error.message });

    // Muestra una alerta de error
    alert("Error al iniciar sesión: " + error.message);
  }
};




// Acción para el registro
// export const registerAction = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
//   try {
//     const response = await fetch(`${api}/api/admin/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message);
//     }

//     const data = await response.json();

//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//     localStorage.setItem("userInfo", JSON.stringify(data));
//     redirect("/dashboard");
//   } catch (error: any) {
//     dispatch({ type: USER_AUTH_FAILURE, payload: error.message });
//     alert("Error al registrar: " + error.message);
//   }
// };

export const registerAction = (name: string, email: string, password: string) => 
  async (dispatch: Dispatch) => {
    try {
      // Realiza la solicitud POST utilizando axios
      const response = await api.post("/api/admin/register", { name, email, password });

      // Despacha la acción de éxito con los datos obtenidos
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });

      // Guarda la información del usuario en localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Redirige manualmente al dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      // Si ocurre un error, captura el mensaje adecuado
      const errorMessage = error.response?.data?.message || "Error inesperado al registrar";

      // Despacha la acción de error con el mensaje
      dispatch({ type: USER_AUTH_FAILURE, payload: errorMessage });

      // Muestra una alerta con el mensaje de error
      alert("Error al registrar: " + errorMessage);
    }
  };














// // Acción para el logout
// export const logoutAction = () => async (dispatch: Dispatch) => {
//   try {
//     await fetch(`${api}/api/admin/logout`, {
//       method: "POST",
//       credentials: "include",
//     });

//     dispatch({ type: USER_LOGOUT });
//     localStorage.removeItem("userInfo");
//     redirect("/sign-in");
//   } catch (error: any) {
//     console.error("Error al cerrar sesión:", error);
//   }
// };


export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    await fetch(`${api}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("userInfo");

    // Redirigir manualmente al sign-in
    window.location.href = "/sign-in"; // Usar este método si redirect no está definido
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error);
  }
};