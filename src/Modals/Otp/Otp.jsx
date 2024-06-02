import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Otp.module.css";
import submitBtn from "./assets/submit.svg";
import Loader from "../../components/Loader/Loader";
import OtpInput from "../../components/Loader/OtpInput/OtpInput";
import { resendOtp, verifyOtp } from "../../actions/auth";
import { toast } from "react-toastify";
import { LOGIN_STARTED } from "../../actions/actionType/actionType";

const Otp = () => {
  const dispatch = useDispatch();
  const { error, userData } = useSelector((state) => state.allReducers);
  const [isLoading, setIsLoading] = useState(false);
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const loaderOff = () => setIsLoading(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      phone: userData.phone,
      otp: parseInt(otp.join("").trim(), 10),
    };
    if (data.otp.length < 6) {
      alert("Enter the Full OTP!");
      return;
    }
    setIsLoading(true);
    dispatch(verifyOtp(data, loaderOff, toast));
  };

  const resend = async () => {
    setIsLoading(true);
    dispatch(resendOtp({ phone: userData.phone }, loaderOff, toast));
  };

  return (
    <div className={styles.formCont}>
      <h2>Verify your OTP!</h2>
      <div className={styles.formik}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputCont}>
            <label htmlFor="name">Enter the OTP sent to your email.</label>
            <div className={styles.inputwrap}>
              <OtpInput otp={otp} setOtp={setOtp} length={length} />
            </div>
          </div>
          <p className={styles.resendLink}>
            Didn't receive OTP? <span onClick={resend}>Resend OTP</span>
          </p>
          <div className={styles.btnwrap}>
            <button type="submit" disabled={isLoading}>
              <span>
                {isLoading ? (
                  <div className={styles.loaderWrap}>
                      <Loader loaderht="40px" spinnerbox="28px" />
                  </div>
                ) : (
                  <img src={submitBtn} alt="" />
                )}
              </span>
            </button>
            <p>
              Already have an account?
              <span
                onClick={() =>
                  dispatch({ type: LOGIN_STARTED, payload: { step: 1 } })
                }
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
