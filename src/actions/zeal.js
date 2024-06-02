import * as api from "../api";
import {
  FETCH_ZEAL_ID_END,
  FETCH_ZEAL_ID_STARTED,
  FETCH_ZEAL_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionType/actionType";

export const fetchZealId = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ZEAL_ID_STARTED });
    console.log("Fetch Zeal Id Started");

    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: FETCH_ZEAL_ID_END });
      return;
    }
    let response = await api.fetchZealId(token);
    if (response.status === 200) {
      // console.log("ZEALID", response);
      dispatch({
        type: FETCH_ZEAL_ID_SUCCESS,
        payload: {
          zealId: response.data.zeal_id,
          step: 5,
          userData: response.data.userData,
        },
      });
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {
          error: "Unauthorized Access",
          step: 2,
        },
      });
      return;
    } else if (error.response.status === 404) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { step: 1 }, // login
      });
    } else {
      dispatch({
        type: LOGOUT,
        payload: {
          error: "Don't Pay, Contact Developers!!!",
        },
      });
    }
  }
};

