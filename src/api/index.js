import axios from "axios";
// const SERVER_URL =
//   process.env.NODE_ENV === "production"
//   ? "https://zealicon-api-24.onrender.com"
//   : process.env.NODE_ENV === "development"
//     ? "http://localhost:8181"
//     : `${import.meta.env.VITE_SERVER}`;

const SERVER_URL = "https://zealicon-api-24.onrender.com"
// const SERVER_URL = "http://localhost:8181"

const API = axios.create({
  baseURL: SERVER_URL,
});

// Subsequent request having tokens
API.interceptors.request.use((req) => {
  if (localStorage.getItem("userData")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});

export const signUp = (formData) => API.post("/api/auth/signup", formData);
export const logIn = (authData) => API.post("/api/auth/web-login", authData);
export const verifyOtp = (data) => API.post("/api/auth/verify-otp", data);
export const resendOtp = (data) => API.patch("/api/auth/resend-otp", data);
export const verifyUser = (jwtToken) =>API.get(`/api/auth/verify/${jwtToken}`)

// Payment
export const getPaymentKey = () => API.get("/api/payment/get-key");
export const checkout = (data) => API.post("/api/payment/checkout", data);
export const paymentVerification = (paymentData, ID) =>
  API.post(`/api/payment/payment-verification/${ID}`, paymentData);

// Zeal Id
export const fetchZealId = (jwtToken) =>
  API.get(`/api/payment/web-get-zeal-id/${jwtToken}`);
