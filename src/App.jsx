import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./contexts/NavigationContext";

import { AuthProvider } from "./contexts/AuthContext";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/forms/NavBar";
import "./App.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavigationProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route key="1" path="/" element={<IntroPage />}></Route>
              <Route key="2" path="/home" element={<HomePage />}></Route>
            </Routes>
          </BrowserRouter>
        </NavigationProvider>
      </AuthProvider>
    </>
  );
}
