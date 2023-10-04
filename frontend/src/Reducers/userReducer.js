import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    GET_EMAIL_REQUEST,
    GET_EMAIL_SUCCESS,
    GET_EMAIL_FAIL,
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
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../Constants/userConstant"

export const userReducer = (state = {user:{} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case LOAD_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case LOGIN_SUCCESS:
      case LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          loginError: "",
          loginSuccess: "Đăng nhập thành công",
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          signupError: "",
          signupSuccess: "Đăng ký thành công",
      };
      case LOGOUT_SUCCESS:
        return {
            loading: false,
            user: null,
            isAuthenticated: false,
        };
      case LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload.error,
            message: action.payload.message,
            loginError: "Email hoặc mật khẩu sai",
            loginSuccess: "",
        };
      case REGISTER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
          message: action.payload.message,
          signupError: "Email hoặc mật khẩu sai",
          signupSuccess: "",
      };
      case LOAD_FAIL:
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
            message: action.payload.message,
        };
      case LOGOUT_FAIL:
        return {
            ...state,
              loading: false,
            error: action.payload,
        };


      case CLEAR_ERRORS:
        return {
            ...state,
            error: null,
        }
      default:
          return state;
  }
}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
      case UPDATE_USER_REQUEST:
      case DELETE_USER_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case UPDATE_PROFILE_SUCCESS:
      case UPDATE_PASSWORD_SUCCESS:
      case UPDATE_USER_SUCCESS:
          return {
                ...state,
              loading: false,
              isUpdated: action.payload,
          };
      case DELETE_USER_SUCCESS:
          return {
              ...state,
              loading: false,
              isDeleted: action.payload.success,
              message: action.payload.message,
                  }
      case UPDATE_PROFILE_FAIL:
      case UPDATE_PASSWORD_FAIL:
      case UPDATE_USER_FAIL:
      case DELETE_USER_FAIL:
          return {
                ...state,
              loading: false,
              error: action.payload,
          };
      case UPDATE_PROFILE_RESET:
      case UPDATE_PASSWORD_RESET:
      case UPDATE_USER_RESET:
          return {
              ...state,
              isUpdated: false,
          }
      case DELETE_USER_RESET:
          return {
              ...state,
              isDeleted: false,
          }
      case CLEAR_ERRORS:
          return {
              ...state,
              error: null,
          };

      default:
          return state;
    }
}

//lay tat ca user -- admin
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//xem chi tiet nguoi dung --admin
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export function getUserReducer(state = {}, action){
  switch (action.type) {
    case GET_EMAIL_REQUEST:
    return {
        ...state,
        loading: true,
        error: null,
    };
  case GET_EMAIL_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action.payload,
      isget: true,  
    };
    case GET_EMAIL_FAIL:
      return {
        ...state,
      loading: false,
      isget: false,
      error: action.payload,
   
      };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type){
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
  }
} 