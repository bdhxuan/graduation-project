import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    GET_EMAIL_REQUEST,
    GET_EMAIL_SUCCESS,
    GET_EMAIL_FAIL,
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../Constants/userConstant";
import axios from "axios";


//dang nhap
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

    dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: data.user 
    });
  } catch (error) {
    dispatch ({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
    });
  }
};

//dang ky
export const register = (userData) => async (dispatch) => {
    try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data, status} = await axios.post(`/api/v1/register`, userData, config);

    let{username, email} = data.user;

    if(status === 201){
      await axios.post(`/api/v1/registerMail`, { username, userEmail : email, text: "Đăng ký tài khoản thành công"})
  }
    dispatch({ 
        type: REGISTER_SUCCESS, 
        payload: data.user 
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//tai trang user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ 
        type: LOAD_SUCCESS, 
        payload: data.user 
    });
  } catch (error) {
    dispatch ({
        type: LOAD_FAIL,
        payload: error.response.data.message
    });
  }
};

//dang xuat
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};


//cap nhat profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/password/update`,passwords,config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export function getUser(email){
  return async dispatch => {
    try {
      dispatch({ type: GET_EMAIL_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/api/v1/user`, email, config);

      dispatch({ 
          type: GET_EMAIL_SUCCESS, 
          payload: data,
      });
      const {data : {code}, status} = await axios.post(`/api/v1/generateOTP`, email, config);
      console.log(status)
      if(status === 201){
        const Email = data.email
        console.log(Email);
        const username = data.username
        console.log(username)
        const text = `Mã OTP của bạn là ${code}`;
        await axios.post(`/api/v1/registerMail`, {userEmail:Email, username, text, subject : "Mã OTP khôi phục mật khẩu"})
      }
    } catch (error) {
      dispatch ({
          type: GET_EMAIL_FAIL,
          payload: error.response.data.message,
      });
    }
  }
  
}

// export async function generateOTP(email){
//   try{
//     const config = { headers: { "Content-Type": "application/json" } };
//     const {data : {code}, status} = await axios.post(`/api/v1/generateOTP`, email, config);
//     console.log(status)
//     if(status === 201){
//       const { data } = await axios.post(`/api/v1/user`, email, config);
//       const Email = data.email
//       console.log(Email);
//       const username = data.username
//       console.log(username)
//       const text = `Mã OTP của bạn là ${code}`;
//       await axios.post(`/api/v1/registerMail`, {userEmail:Email, username, text, subject : "Mã OTP khôi phục mật khẩu"})
//     }
//     return Promise.resolve(code);
//   }catch (error) {
//     return Promise.reject(error);
// }
// };


export async function verifyOTP({email, code}) {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data, status } = await axios.post(`/api/v1/verifyOTP`, {email, code}, config)
    console.log(data);
    return { data, status}
  } catch (error) {
      return Promise.reject(error);
  }
}

export const resetPassword = (password) => async (dispatch) => {
  try {
    dispatch({type: RESET_PASSWORD_REQUEST})
    const config = { headers: { "Content-Type": "application/json" } };
    const {data} = await axios.put(`/api/v1/resetPassword`, password,config);
    dispatch({ 
      type: RESET_PASSWORD_SUCCESS, 
      payload: data.success
    });
  }catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
}

//lay tat ca user -- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

//lay chi tiet nguoi dung --admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

//cap nhat nguoi dung -- admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//xoa nguoi dung --admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};