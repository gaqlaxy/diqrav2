import React from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HorizontalGallery from "./pages/Works";
import ContactPage from "./pages/ContactPage";
import ProcessPage from "./pages/ProcessPage";
import InfiniteGallery from "./pages/InfiniteGallery";
import ProjectDetail from "./pages/ProjectDetail";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<HorizontalGallery />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/gallery" element={<InfiniteGallery />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </>
  );
}
