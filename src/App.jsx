import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenPage from "./pages/AuthenPage";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/authentication" element={<AuthenPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
