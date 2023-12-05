import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenPage from "./pages/AuthenPage";

import "./App.css";
import {useAuth} from "react-oidc-context";

function App() {
    const auth = useAuth();

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
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

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
