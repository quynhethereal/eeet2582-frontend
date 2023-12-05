import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./contexts/NavigationContext";
import IntroPage from "./pages/IntroPage";
import AuthenPage from "./pages/AuthenPage";
import HomePage from "./pages/HomePage";

import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationProvider>
          <Routes>
            <Route path="/" element={<IntroPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/authentication" element={<AuthenPage />}></Route>
          </Routes>
        </NavigationProvider>
      </BrowserRouter>
    </>
  );
}
