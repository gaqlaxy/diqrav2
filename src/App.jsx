import React from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HorizontalGallery from "./pages/Works";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<HorizontalGallery />} />
        </Routes>
      </Router>
    </>
  );
}
