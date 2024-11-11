import axios from "axios";

import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_FAIL,
    USER_LOGIN_REQ_SUCCESS,

    USER_LOGOUT,
    USER_REGISTER_REQ,
    USER_REGISTER_REQ_FAIL,
    USER_REGISTER_REQ_SUCCESS,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS, 
    USER_PROFILE_FAIL

} from "../Constants/User"
import { BASE_URL } from "../Constants/BASE_URL";


//user login action 
export const userLoginAction = (email, password) => async (dispatch)=>{
    try {
        dispatch({ type: USER_LOGIN_REQ })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`${BASE_URL}/api/users/login`, { email, password }, config);

        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))


    } catch (error) {
        alert("Usuario incorrecto o contraseña incorrectos")
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: error.response.data.message
       })
    }
}

export const userLoginActionGoogle = () => async (dispatch)=>{
    try {
        dispatch({ type: USER_LOGIN_REQ })
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // }
        const { data } = await axios.get(`${BASE_URL}/auth/google`, {
            withCredentials: true, 
        });

        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))

        window.location.href = "/";

    } catch (error) {
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: error.response.data.message
       })
    }
}

//user logout action 
export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT })
    document.location.href = "/login"
};


//register 
export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQ });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.post(`${BASE_URL}/api/users/register`, { name, email, password }, config);
        dispatch({ type: USER_REGISTER_REQ_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))


     } catch (error) {
        dispatch({
            type: USER_REGISTER_REQ_FAIL,
            payload: error.response.data.message
        })
    }
}

/*
estas dos de abajo pdtes de modficarlas pa q jalen la info
*/
//jala toda la info de perfil..usar esta eigual para el perfil info update en la vista de perfil    
export const userProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const token = userInfo?.token;
        console.log("Token:", token); // <-- Esto mostrará el token en la consola del navegador para depuración


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${BASE_URL}/api/users/profile`, config);

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        // const userInfo = getState().userLoginReducer.userInfo;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log("Config headers:", config);

        const { data } = await axios.get(`${BASE_URL}/api/users/profile`, config);

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};

export const updateUserProfileAction = (profileData) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${BASE_URL}/api/users/profile`, profileData, config);

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};




export const userPasswordResetAction = (email) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`${BASE_URL}/api/users/recuperar`, { email }, config);

        alert("Correo de recuperación enviado. Verifica tu bandeja de entrada.");

        window.location.href = `/reset`;
    } catch (error) {
        console.error(error);
        alert("Error al enviar el correo. Por favor, verifica tu dirección.");
    }
};