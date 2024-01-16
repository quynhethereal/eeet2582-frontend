import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import SubscriptionOption from "../components/Subscription/SubscriptionOption";
import PopupModal from "../components/Subscription/PopupModal";
import CurrentPlanDisplay from "../components/Subscription/CurrentPlanDisplay";


export default function PricePage() {
  let [message, setMessage] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    const query = new URLSearchParams(window.location.search);
    const isSuccess = query.get("success");
    const isCanceled = query.get("canceled");

    setSuccess(!!isSuccess);
    setMessage(
      isSuccess ? "Payment successful!" : "Payment canceled. Please try again."
    );
    setShowModal(isSuccess || isCanceled);

    if (isAuthenticated && user?.access_token) {
      setToken(user.access_token);
      fetchCurrentUserPlan(user.access_token);
    }
  }, [isAuthenticated, user]);

  const handleCancelSubscription = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_ORIGIN}/payment/create-checkout-session`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error canceling current user plan:", error);
    }
  };

  const fetchCurrentUserPlan = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ORIGIN}/payment/create-checkout-session`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentUserPlan(response.data);
    } catch (error) {
      console.error("Error fetching current user plan:", error);
    }
  };

  const handleCheckOutSubmit = async (stripeProductKey) => {
    if (token) {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_SERVER_ORIGIN
          }/payment/create-checkout-session`,
          { lookup_key: stripeProductKey },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        window.location.href = response.data.checkout_url;
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  const handleCloseModal = () => {
    window.history.pushState({}, "", new URL(window.location).origin);
    setShowModal(false);
  };

  const handleUnauthorizedClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
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
          isAuthorized={isAuthenticated}
          onUnauthorizedClick={handleUnauthorizedClick}
        />
      </div>
      {/* Display Current Plan */}
      <CurrentPlanDisplay
        currentUserPlan={currentUserPlan}
        isAuthenticated={isAuthenticated}
        handleCancelSubscription={handleCancelSubscription}
      />

      {/* Modal */}
      <PopupModal
        show={showModal}
        onClose={handleCloseModal}
        title={success ? "Success" : "Canceled"}
      >
        {message}
      </PopupModal>
      <PopupModal
        show={showLoginModal}
        onClose={handleCloseLoginModal}
        title="Login Required"
      >
        Please log in to subscribe.
      </PopupModal>
    </div>
  );
}
