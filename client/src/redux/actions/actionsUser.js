import axios from "axios";
import { SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "../constants/constUser";

export const signUp = (newUser, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      newUser
    );
    dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
    navigate("/signin");
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGN_UP_FAIL, payload: error });
  }
};
