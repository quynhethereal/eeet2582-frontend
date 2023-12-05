import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import AuthenPage from "./pages/AuthenPage";
import HomePage from "./pages/HomePage"

import "./App.css";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IntroPage />}></Route>
                    <Route path="/home" element={<HomePage />}></Route>
                    <Route path="/authentication" element={<AuthenPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );

}
