import { SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "../constants/constUser";

const inittialState = {
  errors: null,
};

export const userReducer = (state = inittialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_FAIL:
      return { ...state, errors: payload };
    default:
      return state;
  }
};
