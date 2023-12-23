import React from "react";

function SubscriptionOption({
  duration,
  description,
  price,
  buttonColor,
  onCheckout,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:scale-110">
      <h2 className="text-4xl font-bold text-gray-800">{duration}</h2>
      <p className="text-gray-600 mt-10">{description}</p>

      <div className="text-gray-900 text-4xl font-semibold mt-6">{price}</div>

      <button
        onClick={onCheckout}
        className={`mt-6 w-full ${buttonColor} text-white font-bold py-2 px-4 rounded hover:${buttonColor.replace(
          "500",
          "700"
        )}`}
      >
        Subscribe
      </button>
    </div>
  );
}

export default SubscriptionOption;
