import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import SubscriptionOption from "../components/Subscription/SubscriptionOption";

export default function PricePage() {
  let [message, setMessage] = useState("");
  const { user, isAuthenticated } = useAuth();
  let [token, setToken] = useState();
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
      console.log("success payment: ", sessionId);
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );

      console.log(message);
    }
  }, [sessionId, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.access_token) {
        console.log("token before set", user.access_token);
        setToken(user.access_token);
        console.log(isAuthenticated);
        console.log("token after set", token);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    console.log("token after set", token);
  }, [token]);

  // Mock current plan data - replace with real data as needed
  const currentUserPlan = {
    duration: "6 Months",
    price: "$19.99",
  };

  const handleCancelSubscription = () => {
    // Logic to handle subscription cancellation
    console.log("Subscription Cancelled");
  };

  const handleCheckOutSubmit = async (stripeProductKey) => {
    const bearerToken = token;
    console.log("bere", bearerToken);
    if (bearerToken != null && bearerToken != "") {
      try {
        console.log("productkey", stripeProductKey);
        const response = await axios.post(
          `${
            import.meta.env.VITE_SERVER_ORIGIN
          }payment/create-checkout-session`,
          {
            lookup_key: stripeProductKey,
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        // Handle the response as needed
        const checkout_url = response.data.checkout_url;
        window.location.href = checkout_url;
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-extrabold mt-10 mb-6 text-gray-900">
        Choose Your Subscription Plan
      </h1>

      {/* Display Current Plan */}
      <div className=" md:grid md:grid-cols-4 mb-10 p-4  bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Current Plan</h2>
        <p className="text-2xl text-gray-600 ">{currentUserPlan.duration}</p>
        <div className="text-2xl font-semibold text-gray-900 ">
          {currentUserPlan.price}
        </div>
        <button
          onClick={handleCancelSubscription}
          className="md:mt-0 mt-6 py-2 px-6 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition ease-in-out duration-300"
        >
          Cancel Subscription
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 3 Months Subscription */}
        <SubscriptionOption
          duration="3 Months"
          description="Short-term access"
          price="$9.99"
          buttonColor="bg-yellow-500"
          onCheckout={() =>
            handleCheckOutSubmit(import.meta.env.VITE_PRODUCT_KEY_1)
          }
        />
        {/* 6 Months Subscription */}
        <SubscriptionOption
          duration="6 Months"
          description="Medium-term access"
          price="$19.99"
          buttonColor="bg-amber-500"
          onCheckout={() =>
            handleCheckOutSubmit(import.meta.env.VITE_PRODUCT_KEY_1)
          }
        />
        {/* 1 Year Subscription */}
        <SubscriptionOption
          duration="12 Months"
          description="Long-term access"
          price="$49.99"
          buttonColor="bg-orange-500"
          onCheckout={() =>
            handleCheckOutSubmit(import.meta.env.VITE_PRODUCT_KEY_1)
          }
        />
      </div>
    </div>
  );
}
