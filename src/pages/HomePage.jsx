import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyToaster from "../components/Toaster/MyToaster";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function HomePage() {
  const [userData, setUserData] = useState();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.id_token) {
        const decodedToken = jwtDecode(user.id_token);
        setUserData(decodedToken);
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="mt-6 flex flex-col justify-center items-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Hello {userData && userData.name}
        </h1>
      </div>
      <MyToaster />
    </>
  );
}
