import React from "react";

function CurrentPlanDisplay({
  currentUserPlan,
  isAuthenticated,
  handleCancelSubscription,
}) {
  console.log(currentUserPlan);
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="md:grid md:grid-cols-5 mt-10 p-3 gap-3 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800">Your Current Plan</h2>
      <p className="text-2xl text-gray-600">{currentUserPlan.plan_name}</p>
      <div className="text-2xl font-semibold text-gray-900">
        ${currentUserPlan.price}
      </div>

      {/* Conditionally display plan details based on status */}
      {currentUserPlan.status === "active" && (
        <p className="text-xl text-gray-600">
          Next charge on: {currentUserPlan.end_date}
        </p>
      )}
      {currentUserPlan.status === "endsoon" && (
        <p className="text-xl text-red-600">
          Subscription ending on: {currentUserPlan.end_date}
        </p>
      )}
      {currentUserPlan.status === "trialing" && (
        <p className="text-xl text-red-600">
          Subscription ending on: {currentUserPlan.end_date}
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
  );
}

export default CurrentPlanDisplay;
