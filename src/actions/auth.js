import * as api from "../api";
import {
  FETCH_ZEAL_ID_STARTED,
  FETCH_ZEAL_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
  USER_VERIFICATION_FAILURE,
  USER_VERIFICATION_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from "./actionType/actionType";

// Action creators
export const signup = (authData, loaderOff, toast) => async (dispatch) => {
  try {
    const response = await api.signUp(authData);
    const { data } = response;

    if (response.status === 201) {
      toast.success(`OTP sent to ${authData.email}`);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          step: 3,
          userData: {
            name: authData.name,
            email: authData.email,
            phone: authData.phone,
          },
        },
      });
    }
  } catch (error) {
    if (error.response.status === 404) {
      dispatch({ type: SIGNUP_FAILURE, payload: { error: data.message } });
    } else if (error.response.status === 500) {
      dispatch({ type: SIGNUP_FAILURE, payload: { error: data.message } });
    } else if (error.response.status === 409) {
      // user already exists
      toast.error("Already Registered Phone No.");
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {
          // error: "Already Registered Phone, Login Instead!",
          error: null,
          step: 1,
        },
      });
    } else {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: { error: error.message },
      });
    }
    console.log(error);
  } finally {
    loaderOff();
  }
};

export const login = (authData, loaderOff, toast) => async (dispatch) => {
  try {
    const response = await api.logIn(authData);
    if (response.status === 200) {
      toast.success(`OTP sent to ${response.data.email}`);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          step: 3,
          userData: {
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
          },
        },
      });
    }
  } catch (error) {
    if (error.response.status === 404) {
      // Phone not found
      toast.error("Please Register First!");
      dispatch({
        type: SIGNUP_STARTED,
        payload: { error: null, step: 2 },
      });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: { error: error.message } });
    }
    console.log(error);
  } finally {
    loaderOff();
  }
};

export const verifyOtp = (data, loaderOff, toast) => async (dispatch) => {
  try {
    const response = await api.verifyOtp(data);
    if (response.status === 200) {
      const { data } = response;
      localStorage.setItem("token", data.token); // set the token
      localStorage.setItem("id", data._id); // set user ID here
      console.log("Verified Successfully");
      toast.success("Verified Sucessfully!");

      // Fetch Zeal Id here
      try {
        console.log("Fetching Zeal Id");
        dispatch({ type: FETCH_ZEAL_ID_STARTED });
        let responseForZeal = await api.fetchZealId(data.token);
        // console.log("Response", responseForZeal);
        if (responseForZeal.status === 200) {
          dispatch({
            type: FETCH_ZEAL_ID_SUCCESS,
            payload: {
              zealId: responseForZeal.data.zeal_id,
              step: 5,
              isAuthenticated: true,
              userData: responseForZeal.data.userData,
            },
          });
        }
      } catch (error) {
        if (error.response.status === 401) {
          dispatch({
            type: SIGNUP_FAILURE,
            payload: {
              error: "Unauthorized Access",
              step: 2,
            },
          });
          localStorage.clear();
          return;
        } else if (error.response.status === 404) {
          // let res = await api.verifyUser(localStorage.getItem("token"));
          dispatch({
            type: VERIFY_OTP_SUCCESS,
            payload: { step: 4 }, // payment page - redirect - no zeal id found
          });
        } else {
          dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: {
              error: "Don't Pay, Contact Developers!!!",
            },
          });
        }
      }
    }
  } catch (error) {
    if (error.response.status === 404) {
      dispatch({
        type: VERIFY_OTP_FAILURE,
        payload: { error: error.message },
      });
    } else if (error.response.status === 400) {
      // Invalid OTP
      toast.error("Invalid OTP!");
      dispatch({
        type: VERIFY_OTP_FAILURE,
        payload: { error: "Invalid OTP!" },
      });
    } else {
      dispatch({ type: VERIFY_OTP_FAILURE, payload: { error: error.message } });
    }
    console.log(error);
  } finally {
    loaderOff();
  }
};

export const resendOtp = (data, loaderoff, toast) => async (dispatch) => {
  try {
    const response = await api.resendOtp(data);
    if (response.status === 200) {
      toast.success("OTP Sent Successfully");
      dispatch({ type: RESEND_OTP_SUCCESS });
    }
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 500) {
      dispatch({
        type: VERIFY_OTP_FAILURE,
        payload: { error: error.message },
      });
    } else {
      dispatch({ type: VERIFY_OTP_FAILURE, payload: { error: error.message } });
    }
    console.log(error);
  } finally {
    loaderoff();
  }
};

export const verifyUser = () => async (dispatch) => {
  try {
    console.log("User verfication started");
    const token = localStorage.getItem("token");
    const ID = localStorage.getItem("id");
    if (!token || !ID) {
      dispatch({ type: USER_VERIFICATION_FAILURE });
      return;
    }
    let response = await api.verifyUser(token);
    // console.log("respnose", response);
    if (response.status === 200) {
      if (response.data.zeal_id?.length > 0) {
        dispatch({
          type: FETCH_ZEAL_ID_SUCCESS,
          payload: {
            step: 5,
            userData: response.data.userData,
            zealId: response.data.zeal_id,
          },
        });
      } else {
        dispatch({
          type: USER_VERIFICATION_SUCCESS,
          payload: {
            step: 4,
            userData: response.data.userData,
          },
        });
      }
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
    }
    dispatch({
      type: USER_VERIFICATION_FAILURE,
    });
  }
};
