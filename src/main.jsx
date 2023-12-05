import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App.jsx";
import "./index.css";

const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;
const oauthProvider = import.meta.env.VITE_OAUTH_PROVIDER;
const appOrigin = window.location.origin;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

const oidcConfig = {
  authority: oauthProvider,
  client_id: githubClientId,
  redirect_uri: appOrigin,
  client_secret: client_secret,
  scope: "email profile",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
