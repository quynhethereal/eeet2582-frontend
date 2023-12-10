import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/Route/ProtectedRoute";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/forms/NavBar";
import PricePage from "./pages/PricePage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route key="1" path="/" element={<IntroPage />}></Route>
        <Route
          key="2"
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route key="3" path="/price" element={<PricePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
