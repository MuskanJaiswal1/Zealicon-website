import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import ghost from "./assets/ghost.svg";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../../Modals/Signup/Signup";
import Zeal from "../../Modals/Zeal/Zeal";
import Otp from "../../Modals/Otp/Otp";
import Login from "../../Modals/Login/Login";
import Pay from "../../Modals/Pay/Pay";
import ellipse from "./assets/ellipse.svg";
import total from "./assets/total.svg";
import text from "./assets/text.svg";

const Modal = ({ setIsModalOpen }) => {
  const { error, step, isPaymentDone } = useSelector(
    (state) => state.allReducers
  );

  const [displayError, setDisplayError] = useState(error);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timeout = setTimeout(() => {
        setDisplayError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (isPaymentDone) {
      setPaymentSuccess("Payment Done Successfully!");
      const timeout = setTimeout(() => {
        setPaymentSuccess(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isPaymentDone]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button className={styles.cross} onClick={() => setIsModalOpen(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu / Close_MD">
              <path
                id="Vector"
                d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>
        {displayError && (
          <p
            style={{
              color: "red",
              fontWeight: "700",
              fontSize: "22px",
              paddingTop: "0.8rem",
            }}
          >
            {displayError}
          </p>
        )}
        <div className={styles.innerCont}>
          <div className={styles.imgCont}>
            <img src={ellipse} className={styles.ellipse} />
            <img src={total} className={styles.total} alt="" />
            <img src={text} className={styles.t} alt="" />
          </div>
          {step === 1 ? (
            <Login />
          ) : step === 2 ? (
            <Signup />
          ) : step === 3 ? (
            <Otp />
          ) : step === 4 ? (
            <Pay />
          ) : (
            <Zeal />
          )}
        </div>
        {isPaymentDone && (
          <div className={styles.wrapPayment}>
            <span>{paymentSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
