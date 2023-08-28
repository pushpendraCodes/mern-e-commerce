import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';

import CheckoutForm from "./CheckoutForm";
import "../stripe.css";
import { currentOrder } from "../features/Order/OrderSlice";


const stripePromise = loadStripe("pk_test_51NivbySHnCqcpMx1D6H4VQ8wL24phjboA4Z2bjRIogaElTFjSjF2CKiKZ4dvPBPAPcCi8lzW6jBStl8DnsGDS7L8009ajjFaeg");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const CurrentOrder = useSelector(currentOrder)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: CurrentOrder.totalAmount, orderId:CurrentOrder.id }),

    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}