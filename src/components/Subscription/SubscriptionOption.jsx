import React from "react";

function SubscriptionOption({
  duration,
  description,
  price,
  buttonColor,
  onCheckout,
  disabled = false,
  isAuthorized = true,
  onUnauthorizedClick,
}) {
  const disabledClass = "opacity-50 bg-gray-200";
  const enabledClass = "hover:scale-110 bg-white";
  const buttonDisabledClass = "bg-gray-400 cursor-not-allowed";
  const buttonEnabledClass = `${buttonColor} hover:${buttonColor.replace(
    "500",
    "700"
  )}`;

  const handleClick = () => {
    if (isAuthorized) {
      onCheckout();
    } else {
      onUnauthorizedClick();
    }
  };

  return (
    <div
      className={`rounded-lg shadow p-6 ${
        disabled ? disabledClass : enabledClass
      }`}
    >
      <h2 className="text-4xl font-bold text-gray-800">{duration}</h2>
      <p className="text-gray-600 mt-10">{description}</p>
      <div className="text-gray-900 text-4xl font-semibold mt-6">{price}</div>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`mt-6 w-full text-white font-bold py-2 px-4 rounded ${
          disabled ? buttonDisabledClass : buttonEnabledClass
        }`}
      >
        Subscribe
      </button>
    </div>
  );
}

export default SubscriptionOption;
