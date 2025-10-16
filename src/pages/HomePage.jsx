import React from "react";
// import Herosection from "../components/HeroSection";
import AboutSection from "../components/About";
import OhHerosection from "../components/OhHeroSection";
import FeaturedWorks from "../components/FeaturedWorks";
import ProcessSection from "../components/ProcessSection";
import Services from "../components/Services";

export default function HomePage() {
  return (
    <>
      <OhHerosection />
      {/* <Herosection /> */}
      <AboutSection />
      <FeaturedWorks />
      <ProcessSection />
      <Services />
    </>
  );
}
