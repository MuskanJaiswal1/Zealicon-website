import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema1, validationSchema2 } from "./validationSchema";
import { signup } from "../../actions/auth";
import styles from "./Signup.module.css";
import Loader from "../../components/Loader/Loader";
import camera from "./assets/camera.svg";
import next from "./assets/next.svg";
import { LOGIN_STARTED } from "../../actions/actionType/actionType";
import { toast } from "react-toastify";

const Signup = ({ setModal }) => {
  const dispatch = useDispatch();
  const { isZealIdFetcing } = useSelector((state) => state.allReducers);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState();
  const loaderoff = () => setIsLoading(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    id_card: "",
  });

  const handleSubmit = async (values) => {
    setFormData({ ...formData, ...values });
    if (step === 1) {
      setStep((prev) => prev + 1);
      return;
    }
    setIsLoading(true);
    try {
      // console.log(
      //   "Values",
      //   values.email,
      //   values.id_card,
      //   values.phone,
      //   values.id_card
      // );
      // let formDataToSend = new FormData();
      // formDataToSend.append("name", values.name);
      // formDataToSend.append("email", values.email);
      // formDataToSend.append("phone", values.phone);
      // formDataToSend.append("id_card", values.id_card);
      // for(var pair of formDataToSend.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        id_card: photo,
      };
      // console.log("Form DATA", data);
      dispatch(signup(data, loaderoff, toast));
    } catch (error) {
      console.log("Error Occured");
    }
  };

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <Formik
            initialValues={{
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            }}
            validationSchema={validationSchema1}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className={styles.form}>
                <div className={styles.inputCont}>
                  <label htmlFor="name">Name</label>
                  <div className={styles.inputwrap}>
                    <Field
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      autoComplete="off"
                      validate={(value) => {
                        try {
                          validationSchema1.fields.name.validateSync(value);
                        } catch (error) {
                          return error.message;
                        }
                      }}
                    />
                  </div>
                  <ErrorMessage
                    className={styles.error}
                    name="name"
                    component="div"
                  />
                </div>
                <div className={styles.inputCont}>
                  <label htmlFor="email">Email</label>
                  <div className={styles.inputwrap}>
                    <Field
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Default@gmail.com"
                      autoComplete="off"
                      validate={(value) => {
                        try {
                          validationSchema1.fields.email.validateSync(value);
                        } catch (error) {
                          return error.message;
                        }
                      }}
                    />
                  </div>
                  <ErrorMessage
                    className={styles.error}
                    name="email"
                    component="div"
                  />
                </div>
                <div className={styles.inputCont}>
                  <label htmlFor="phone">Phone Number</label>
                  <div className={styles.inputwrap}>
                    <Field
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="0000000000"
                      autoComplete="off"
                      validate={(value) => {
                        try {
                          validationSchema1.fields.phone.validateSync(value);
                        } catch (error) {
                          return error.message;
                        }
                      }}
                    />
                  </div>
                  <ErrorMessage
                    className={styles.error}
                    name="phone"
                    component="div"
                  />
                </div>
                <div className={styles.btnwrap}>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    <span>
                      {isLoading || isZealIdFetcing ? (
                        <div className={styles.loaderWrap}>
                          <Loader loaderht="40px" spinnerbox="28px" />
                        </div>
                      ) : (
                        <img src={next} alt="" />
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
              </Form>
            )}
          </Formik>
        );
      case 2:
        return (
          <Formik
            initialValues={{
              name: formData.name,
              id_card: null,
            }}
            validationSchema={validationSchema2}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className={styles.form}>
                <div className={styles.inputCont}>
                  <label htmlFor="name">Name</label>
                  <div className={styles.inputwrap}>
                    <Field
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      autoComplete="off"
                      validate={(value) => {
                        try {
                          validationSchema1.fields.name.validateSync(value);
                        } catch (error) {
                          return error.message;
                        }
                      }}
                    />
                  </div>
                  <ErrorMessage
                    className={styles.error}
                    name="name"
                    component="div"
                  />
                </div>
                <div className={styles.inputCont}>
                  <label htmlFor="file">Upload your college ID card</label>
                  <div
                    className={styles.uploadCont}
                    onClick={() =>
                      document.querySelector(".uploadInput").click()
                    }
                  >
                    <input
                      id="file"
                      type="file"
                      name="id_card"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          formik.setFieldValue(
                            "id_card",
                            event.currentTarget.files[0]
                          );
                          setImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                          const file = event.currentTarget.files[0];
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = () => {
                            setPhoto(reader.result);
                          };
                        }
                      }}
                      className="uploadInput"
                      style={{ display: "none" }}
                    />
                    {image ? (
                      <>
                        <div className={styles.upload}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p>Uploaded</p>
                        </div>
                        <img src={image} />
                      </>
                    ) : (
                      <>
                        <div className={styles.preUpload}>
                          <div className={styles.svgHold}>
                            <img src={camera} alt="" />
                          </div>
                          <p>Upload</p>
                        </div>
                        <p className={styles.redText}>
                          *Once uploaded it can not be edited.
                        </p>
                      </>
                    )}
                  </div>
                  <ErrorMessage
                    className={styles.error}
                    name="id_card"
                    component="div"
                  />
                </div>
                <div className={styles.btnwrap}>
                  <button
                    type="submit"
                    disabled={
                      formik.isSubmitting || !formik.isValid || isLoading
                    }
                  >
                    <span>
                      {isLoading || isZealIdFetcing ? (
                        <div className={styles.loaderWrap}>
                          <Loader loaderht="40px" spinnerbox="28px" />
                        </div>
                      ) : (
                        <img src={next} alt="" />
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
              </Form>
            )}
          </Formik>
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.formCont}>
      <h2>Let's get started!</h2>
      {renderStepForm()}
    </div>
  );
};

export default Signup;
