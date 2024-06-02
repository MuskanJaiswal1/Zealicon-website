import {
  FETCH_ZEAL_ID_END,
  FETCH_ZEAL_ID_FAILURE,
  FETCH_ZEAL_ID_STARTED,
  FETCH_ZEAL_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS,
  RESEND_OTP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
  USER_VERIFICATION_FAILURE,
  USER_VERIFICATION_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from "../actions/actionType/actionType";

const initialState = {
  isAuthenticated: false,
  isZealIdFetching: false,
  userData: {}, // {name : "", secure_url: ""}
  error: null,
  zealId: null,
  step: 1,
  isPaymentDone: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_STARTED:
    case LOGIN_STARTED:
      return {
        ...state,
        step: action.payload.step,
        userData: {},
        error: action.payload.error,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload.userData, // { email: "",  phone:""}
        isAuthenticated: false, // Signup pe authentication true nhi karna but otp verified pe true karna hai
        step: action.payload.step,
        error: null,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        userData: {},
        step: action.payload.step,
        isZealIdFetching: false,
        isAuthenticated: false,
        error: action.payload.error,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload.error,
        isZealIdFetching: false,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload.error,
        isZealIdFetching: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        step: action.payload.step,
        error: null,
        isZealIdFetching: false,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        userData: {},
        isAuthenticated: false,
        error: null,
        zealId: null,
        isPaymentDone: false,
        isZealIdFetching: false,
        step: 1,
      };

    // Fetch Zeal Id Reducers
    case FETCH_ZEAL_ID_STARTED:
      return {
        ...state,
        isZealIdFetching: true,
      };
    case FETCH_ZEAL_ID_SUCCESS:
      return {
        ...state,
        zealId: action.payload.zealId,
        isZealIdFetching: false,
        step: action.payload.step,
        userData: action.payload.userData,
        isAuthenticated: true,
        error: null,
      };
    case FETCH_ZEAL_ID_FAILURE:
      return {
        ...state,
        zealId: null,
        userData: {},
        isZealIdFetching: false,
        error: action.payload.error,
      };
    case FETCH_ZEAL_ID_END:
      return {
        ...state,
        isZealIdFetching: false,
      };

    // Verified
    case USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        step: action.payload.step,
        userData: action.payload.userData,
        error: null,
      };

    case USER_VERIFICATION_FAILURE:
      return {
        ...state,
        isAuthenticated: false, // explicity set
        error: null, // explicity set
      };

    // Payment
    case PAYMENT_SUCCESS:
      return {
        ...state,
        isPaymentDone: true,
        error: null,
      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        isPaymentDone: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default authReducer;
