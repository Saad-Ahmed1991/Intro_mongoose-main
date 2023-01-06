import {
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  LOG_OUT,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
} from "../constants/constUser";

const inittialState = {
  errors: null,
  currentUser: {},
};

export const userReducer = (state = inittialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_FAIL:
      return { ...state, errors: payload };
    case SIGN_IN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, currentUser: payload.user };
    case SIGN_IN_FAIL:
      return { ...state, errors: payload };
    case GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: payload.user };
    case GET_CURRENT_USER_FAIL:
      return { ...state, errors: payload };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        errors: null,
        currentUser: {},
      };
    default:
      return state;
  }
};
