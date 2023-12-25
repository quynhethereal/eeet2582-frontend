import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import SubscriptionOption from "../components/Subscription/SubscriptionOption";
import PaymentModal from "../components/Subscription/PaymentModal";

export default function PricePage() {
  let [message, setMessage] = useState("");
  const { user, isAuthenticated } = useAuth();
  let [token, setToken] = useState();
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUserPlan, setCurrentUserPlan] = useState({
    planName: "",
    status: "",
    price: -1,
    endDate: "",
  });

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setMessage("Payment successful!");
      setShowModal(true);
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage("Payment canceled. Please try again.");
      setShowModal(true);
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
    if (isAuthenticated && token) {
      fetchCurrentUserPlan();
    }
  }, [isAuthenticated, token]);

  const handleCancelSubscription = async () => {
    const bearerToken = token;
    console.log("cancel", bearerToken);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ORIGIN}/payment/create-checkout-session`,
        {}, // The second argument is the request body. If no data needs to be sent, it can be an empty object.
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      if (response.data) {
        console.log("cancel data: ", response.data);
      }
    } catch (error) {
      console.error("Error canceling current user plan:", error);
    }
  };

  const fetchCurrentUserPlan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ORIGIN}payment/create-checkout-session`, // Update with your actual endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setCurrentUserPlan({
          planName: response.data.plan_name, // Adjust these fields based on your actual response data
          price: response.data.price,
          status: response.data.status,
          endDate: response.data.end_date,
        });
      }
    } catch (error) {
      console.error("Error fetching current user plan:", error);
    }
  };

  const handleCloseModal = () => {
    const url = new URL(window.location);
    // Clear search parameters
    url.search = "";
    // Update the URL without reloading the page
    window.history.pushState({}, "", url);
    setShowModal(false);
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

      <div className="grid md:grid-cols-1">
        {/* 3 Months Subscription */}
        <SubscriptionOption
          duration="3 Months"
          description="Short-term access"
          price="$9.99"
          buttonColor="bg-yellow-500"
          onCheckout={() =>
            handleCheckOutSubmit(import.meta.env.VITE_PRODUCT_KEY_1)
          }
          disabled={
            currentUserPlan.status !== "endsoon" &&
            currentUserPlan.status !== "cancelled" &&
            currentUserPlan.status !== "trialing"
          }
        />
      </div>
      {/* Display Current Plan */}
      {isAuthenticated && (
        <div className="md:grid md:grid-cols-5 mt-10 p-3 gap-3 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Current Plan
          </h2>
          <p className="text-2xl text-gray-600">{currentUserPlan.planName}</p>
          <div className="text-2xl font-semibold text-gray-900">
            ${currentUserPlan.price}
          </div>

          {/* Conditionally display plan details based on status */}
          {currentUserPlan.status === "active" && (
            <p className="text-xl text-gray-600">
              Next charge on: {currentUserPlan.endDate}
            </p>
          )}
          {currentUserPlan.status === "endsoon" && (
            <p className="text-xl text-red-600">
              Subscription ending on: {currentUserPlan.endDate}
            </p>
          )}
          {currentUserPlan.status === "trialing" && (
            <p className="text-xl text-red-600">
              Subscription ending on: {currentUserPlan.endDate}
            </p>
          )}
          {currentUserPlan.status === "cancelled" && (
            <p className="text-xl text-red-600">Your plan is cancelled</p>
          )}

          <button
            onClick={handleCancelSubscription}
            disabled={
              currentUserPlan.status === "endsoon" ||
              currentUserPlan.status === "cancelled"
            }
            className={`md:mt-0 mt-6 py-2 px-6 border border-red-500 text-red-500 rounded ${
              currentUserPlan.status === "endsoon" ||
              currentUserPlan.status === "cancelled"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-500 hover:text-white transition ease-in-out duration-300"
            }`}
          >
            Cancel Subscription
          </button>
        </div>
      )}

      {/* Modal */}
      <PaymentModal
        show={showModal}
        onClose={handleCloseModal}
        title={success ? "Success" : "Canceled"}
      >
        {message}
      </PaymentModal>
    </div>
  );
}
