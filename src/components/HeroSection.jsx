import React, { useEffect } from "react";
import gsap from "gsap";
import "../styles/HeroSection.css";

const HeroSection = () => {
  useEffect(() => {
    // Slide down animation for building image (right side)
    gsap.to(".hero-building-image", {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    // Slide up animation for interior image (below button)
    gsap.to(".hero-interior-image", {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.8,
    });

    gsap.from(".hero-excellence-label", {
      duration: 0.5,
      x: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content-left">
          <h1 className="hero-title">
            Your home, your style begin your design adventure
          </h1>
          <p className="hero-description">
            A fusion of modern aesthetics and classical precision, capturing the
            essence of architectural excellence.
          </p>
          <button className="hero-cta-button">
            Our Projects
            <svg
              className="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>

          <div className="hero-interior-image">
            <img
              src="https://images.unsplash.com/photo-1502672260066-6bc2f1a2f771?w=800"
              alt="Modern Interior Design"
            />
          </div>
        </div>

        <div className="hero-content-right">
          <div className="hero-building-image">
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200"
              alt="Modern Architecture Building"
            />
          </div>
          <div className="hero-excellence-label">Architectural Excellence</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
