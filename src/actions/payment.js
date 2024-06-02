import * as api from "../api";
import {
  LOGOUT,
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS,
} from "./actionType/actionType";
import { fetchZealId } from "./zeal";

// Action Creators
export const doPayment = (loaderOff, toast) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const ID = localStorage.getItem("id"); // USER ID HERE
    if (!token || !ID) {
      console.log("Logging out");
      dispatch({ type: LOGOUT });
      return;
    }

    // Get Key - get
    const {
      data: { key },
    } = await api.getPaymentKey();

    const { data } = await api.checkout({ jwtToken: token });
    const { order } = data;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Zealicon",
      description: "Purhcase Zealicon Zeal ID",
      image:
        "https://res.cloudinary.com/dlvkf6kgm/image/upload/v1715349430/idCards/k9lu1au32sfscuieehsg.png",
      order_id: order.id,
      prefill: {
        name: data.userDetails.name,
        email: data.userDetails.email,
        contact: data.userDetails.phone,
      },
      theme: {
        color: "#0076ff", 
        hide_topbar: true, 
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "All Payment Methods",
              instruments: [
                {
                  method: "upi",
                  flows: ["collect", "intent"],
                },
                {
                  method: "card",
                },
                {
                  method: "wallet",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: async function (response) {
        // console.log("Payment Success Response", response);
        if (
          response.razorpay_order_id &&
          response.razorpay_payment_id &&
          response.razorpay_signature
        ) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          try {
            const response = await api.paymentVerification(paymentData, ID);
            if (response.status === 200) {
              toast.success("Payment Successfully Done!");
              dispatch({ type: PAYMENT_SUCCESS, payload: { step: 5 } });
              await dispatch(fetchZealId());
            }
          } catch (error) {
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              toast.error("Contact Developers! Payment Authentication Failed");
              toast.error("Logging out...");
              dispatch({ type: LOGOUT });
              return;
            } else if (error.response.status === 405) {
              dispatch({
                type: PAYMENT_FAILURE,
                payload: { error: error.message },
              });
            } else {
              toast.error("Server Down!");
              dispatch({ type: PAYMENT_FAILURE });
              return;
            }
          }
        }
      },
      modal: {
        ondismiss: function () {
          if (confirm("Are you sure, you want to cancel payment?")) {
            txt = "You pressed OK!";
            console.log("Checkout form closed by the user");
          } else {
            txt = "You pressed Cancel!";
            console.log("Complete the Payment");
          }
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", function (response) {
      // console.log("Payment failed Response", response);
      setTimeout(() => toast.error("Payment Failed!"), 5000);
      dispatch({
        type: PAYMENT_FAILURE,
        payload: { error: response.error.message },
      });
    });

    razor.open();
  } catch (error) {
    console.log(error);
    dispatch({ type: PAYMENT_FAILURE, payload: { error: error.message } });
  } finally {
    loaderOff();
  }
};
