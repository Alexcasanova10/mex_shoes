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


        const { data } = await axios.post(`${BASE_URL}/api/users`, { name, email, password }, config);

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
        dispatch({ type: USER_PROFILE_REQ });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log("Config headers:", config);


        const { data } = await axios.get(`${BASE_URL}/api/users/profile`, config);

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
                      ? error.response.data.message 
                      : error.message,
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