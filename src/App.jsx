import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { verifyUser } from "./actions/auth";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser());
  }, []);
  
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
};

export default App;
