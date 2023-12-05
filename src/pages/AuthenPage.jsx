import React from "react";
import NavBar from "../components/forms/NavBar";
import LoginForm from "../components/forms/LoginForm";

export default function AuthenPage() {
  return (
    <section className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <NavBar />
      <div className="grid grid-rows-1 md:grid-cols-3 md:p-10 px-12 pt-10 md:h-screen">
        <LoginForm styles={["col-start-3 md:h-min"]} />
      </div>
    </section>
  );
}
