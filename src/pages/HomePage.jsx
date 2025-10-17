import React from "react";
// import Herosection from "../components/Herosection";
// import AboutSection from "../components/About";
import OhHerosection from "../components/OhHeroSection";
import FeaturedWorks from "../components/FeaturedWorks";
import ProcessSection from "../components/ProcessSection";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";

export default function HomePage() {
  return (
    <>
      <OhHerosection />
      {/* <Herosection /> */}
      {/* <AboutSection /> */}
      <FeaturedWorks />
      <ProcessSection />
      <Services />
      <Testimonials />
      <CtaSection />
    </>
  );
}
