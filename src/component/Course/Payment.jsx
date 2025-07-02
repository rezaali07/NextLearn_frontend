// src/component/Course/Payment.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";
const Payment = () => {
  const { id } = useParams(); // courseId
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const transactionUUID = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const successUrl = `http://localhost:3000/payment/success/${transactionUUID}`;
  const failureUrl = `http://localhost:3000/payment/failure`;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`);
        setCourse(data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load course.");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const generateSignature = async () => {
    try {
      const { data } = await axios.post("/api/v2/payment/generate-signature", {
        total_amount: course.price,
        transaction_uuid: transactionUUID,
        product_code: "EPAYTEST",
      });
      return data.signature;
    } catch (error) {
      toast.error("Payment initiation failed.");
      return null;
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const signature = await generateSignature();
    if (!signature) return;

    localStorage.setItem("courseIdForPayment", course._id);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const fields = {
      amount: course.price,
      tax_amount: 0,
      total_amount: course.price,
      transaction_uuid: transactionUUID,
      product_code: "EPAYTEST",
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    for (const key in fields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  if (loading || !course) return <Loading />;

  return (
    <>
      <MetaData title="Buy Course" />
      <Header />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={handlePayment}>
          <h2>Confirm Payment via eSewa</h2>
          <p>Course: <strong>{course.title}</strong></p>
          <p>Amount: ₹{course.price}</p>
          <input
            type="submit"
            value={`Pay ₹${course.price} with eSewa`}
            className="paymentFormBtn"
          />
        </form>
      </div>
      <Footer />
      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
};

export default Payment;
