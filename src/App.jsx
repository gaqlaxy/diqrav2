// import React, { useState } from "react";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HorizontalGallery from "./pages/Works";
// import ContactPage from "./pages/ContactPage";
// import ProcessPage from "./pages/ProcessPage";
// import InfiniteGallery from "./pages/InfiniteGallery";
// import ProjectDetail from "./pages/ProjectDetail";
// import Navbar from "./components/Navbar";
// import ServicesPage from "./pages/ServicesPage";
// import ServiceDetailPage from "./pages/ServicesDetailPage";
// import { SpeedInsights } from "@vercel/speed-insights/react";
// import Preloader from "./components/Preloader";

// export default function App() {
//   const [loading, setLoading] = useState(true);

//   const handlePreloaderComplete = () => {
//     setLoading(false);
//   };

//   return (
//     <>
//       {loading && <Preloader onComplete={handlePreloaderComplete} />}
//       {!loading && (
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/works" element={<HorizontalGallery />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/process" element={<ProcessPage />} />
//             <Route path="/gallery" element={<InfiniteGallery />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route
//               path="/services/exterior-design"
//               element={<ServiceDetailPage service="exterior" />}
//             />
//             <Route
//               path="/services/design-planning"
//               element={<ServiceDetailPage service="planning" />}
//             />
//             <Route
//               path="/services/consultation"
//               element={<ServiceDetailPage service="consultation" />}
//             />
//             <Route
//               path="/services/interior-design"
//               element={<ServiceDetailPage service="interior" />}
//             />
//             <Route
//               path="/services/renovation"
//               element={<ServiceDetailPage service="renovation" />}
//             />

//             <Route path="/project/:slug" element={<ProjectDetail />} />
//           </Routes>
//         </Router>
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HorizontalGallery from "./pages/Works";
import ContactPage from "./pages/ContactPage";
import ProcessPage from "./pages/ProcessPage";
import InfiniteGallery from "./pages/InfiniteGallery";
import ProjectDetail from "./pages/ProjectDetail";
import Navbar from "./components/Navbar";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServicesDetailPage";
import Preloader from "./components/Preloader";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      {/* Preloader overlay */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main app renders underneath the preloader */}
      <div
        style={{
          opacity: loading ? 0.4 : 1,
          pointerEvents: loading ? "none" : "auto",
          transition: "opacity 0.6s ease",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<HorizontalGallery />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/gallery" element={<InfiniteGallery />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/services/exterior-design"
            element={<ServiceDetailPage service="exterior" />}
          />
          <Route
            path="/services/design-planning"
            element={<ServiceDetailPage service="planning" />}
          />
          <Route
            path="/services/consultation"
            element={<ServiceDetailPage service="consultation" />}
          />
          <Route
            path="/services/interior-design"
            element={<ServiceDetailPage service="interior" />}
          />
          <Route
            path="/services/renovation"
            element={<ServiceDetailPage service="renovation" />}
          />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>

      <SpeedInsights />
    </Router>
  );
}
