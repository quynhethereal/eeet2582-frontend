import { useAuth } from "../../contexts/AuthContext";
import { classNames } from "../../utilities/utils";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Spinner from "../spinner/Spinner";

const signStyleClass = [
  "bg-blue-700",
  "hover:bg-blue-800",
  "focus:ring-blue-300",
];

const signoutStyleClass = [
  "bg-red-700",
  "hover:bg-red-800",
  "focus:ring-red-300",
];

export default function AuthButton() {
  const { isAuthenticated, signIn, signOut, isLoading } = useAuth();

  const buttonStyleClass = isAuthenticated ? signoutStyleClass : signStyleClass;
  const handleButtonClick = isAuthenticated ? signOut : signIn;

  return (
    <button
      onClick={handleButtonClick}
      type="button"
      className={classNames(
        "flex space-x-2 m-0 shadow-md text-white font-medium focus:ring-4 rounded-lg text-sm px-5 py-2.5 focus:outline-none",
        ...buttonStyleClass
      )}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6 w-6 text-lg" />
      )}
      <span className="text-lg">{isAuthenticated ? "Logout" : "Login"}</span>
    </button>
  );
}
