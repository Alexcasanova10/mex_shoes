import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_SUCCESS,
    USER_LOGIN_REQ_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQ,
    USER_REGISTER_REQ_SUCCESS,
    USER_REGISTER_REQ_FAIL,

    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS, 
    USER_PROFILE_FAIL

} from "../Constants/User"


//user login

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQ:
            return { loading: true }
        case USER_LOGIN_REQ_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_REQ_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
//user REgister
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQ:
            return { loading: true }
        case USER_REGISTER_REQ_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_REQ_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


// export const userProfileReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//         case USER_PROFILE_REQUEST:
//             return { loading: true, ...state };
//         case USER_PROFILE_SUCCESS:
//             return { loading: false, user: action.payload };
//         case USER_PROFILE_FAIL:
//             return { loading: false, error: action.payload };
//         default:
//             return state;
//     }
// }; old

const initialState = {
    loading: false,
    user: null,
    error: null
};

export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};




