// src/component/Course/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const data = query.get("data");

    if (!data) {
      toast.error("Invalid payment response.");
      return;
    }

    try {
      const parsed = JSON.parse(atob(data));

      if (parsed.status === "COMPLETE") {
        const { transaction_uuid } = parsed;
        const courseIdFromStorage = localStorage.getItem("courseIdForPayment");

        if (!courseIdFromStorage) {
          toast.error("No course info found.");
          return;
        }

        setCourseId(courseIdFromStorage);

        axios
          .post(`/api/v2/courses/${courseIdFromStorage}/purchase`, {
            transactionId: transaction_uuid,
          })
          .then(() => {
            toast.success("Payment successful & course unlocked!");
          })
          .catch(() => {
            toast.error("Failed to unlock course.");
          })
          .finally(() => setLoading(false));
      } else {
        toast.error("Payment not completed.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Error parsing payment result.");
      setLoading(false);
    }
  }, [location]);

  const goToCourse = () => {
    if (courseId) {
      history.push(`/course/${courseId}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <MetaData title="Payment Success" />
      <div className="paymentContainer">
        <div className="paymentForm">
          <h2>✅ Payment Successful</h2>
          <p>Your payment was completed successfully.</p>
          <button onClick={goToCourse} className="paymentFormBtn">
            Start Learning
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
};

export default PaymentSuccess;
