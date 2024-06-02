import React, { useState } from "react";
import styles from "./Pay.module.css";
import payBtn from "./assets/payBtn.svg";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { doPayment } from "../../actions/payment";
import { toast } from "react-toastify";
import Btn from "./assets/btn.svg";

const Pay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const loaderOff = () => setIsLoading(false);

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(doPayment(loaderOff, toast));
  };

  return (
    <div className={styles.formCont}>
      <div className={styles.header}>
        Purchase your Zeal Tag
        <br />
        ₹200
      </div>
      <p>
        Entry to ZEALICON 2024 is through a Valid Zeal ID <br />
        You need to pay ₹200 to get the entry
      </p>
      <div className={styles.btnwrap}>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader loaderht="40px" spinnerbox="28px" />
          </div>
        ) : (
          <div
            role="button"
            onClick={() => handleSubmit()}
            className={styles.btnCont}
          >
            <div className={styles.btnwrapImg}>
              <img src={Btn} />
            </div>
            <p>Pay now 200</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;
