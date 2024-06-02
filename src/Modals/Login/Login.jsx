import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import styles from "./Login.module.css";
import nextBtn from "./assets/nextBtn.svg";
import Loader from "../../components/Loader/Loader";
import { SIGNUP_STARTED } from "../../actions/actionType/actionType";
import { toast } from "react-toastify";

const phoneRegex = /^(\+?91|91)?[6789]\d{9}$/;

const Login = () => {
  const dispatch = useDispatch();
  const { isZealIdFetching } = useSelector((state) => state.allReducers);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loaderOff = () => setIsLoading(false);

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!phoneRegex.test(phone.trim())) {
      setIsLoading(false);
      toast.error("Not a Phone Number.");
      return;
    }
    dispatch(login({ phone }, loaderOff, toast));
  };

  return (
    <>
      <div className={styles.formCont}>
        <h2>Welcome Back</h2>
        <div className={styles.formik}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputCont}>
              <label htmlFor="phone">Enter your mobile number</label>
              <div className={styles.inputWrap}>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="0000000000"
                />
              </div>
            </div>
            <div className={styles.btnwrap}>
              <button
                type="submit"
                disabled={isLoading || !phoneRegex.test(phone.trim())}
              >
                <span>
                  {isLoading || isZealIdFetching? (
                    <div className={styles.loaderWrap}>
                      <Loader loaderht="40px" spinnerbox="28px" />
                    </div>
                  ) : (
                    <img src={nextBtn} alt="" />
                  )}
                </span>
              </button>
              <p>
                Create an account!{" "}
                <span
                  onClick={() =>
                    dispatch({ type: SIGNUP_STARTED, payload: { step: 2 } })
                  }
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
