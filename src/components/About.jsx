import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/About.css";

const AboutSection = () => {
  const ctaBtnRef = useRef(null);

  useEffect(() => {
    // Create slide-up text effect for CTA button
    function createSlideUpEffect(element) {
      let span = element.querySelector("span");

      // If no span exists, create one and wrap the text content
      if (!span) {
        const originalText = element.textContent;
        element.innerHTML = `<span>${originalText}</span>`;
        span = element.querySelector("span");
      }

      if (span.querySelector(".text-original")) return; // Avoid double initialization

      // Create duplicate text for the animation
      const originalText = span.textContent;
      span.innerHTML = `
        <span class="text-original">${originalText}</span>
        <span class="text-hover">${originalText}</span>
      `;

      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");

      // Ensure text is visible by default
      gsap.set(span, {
        overflow: "hidden",
        height: "auto",
        position: "relative",
        display: "block",
      });

      // Set initial positions - make sure original text is visible
      gsap.set(originalSpan, {
        y: 0,
        position: "relative",
        display: "block",
      });
      gsap.set(hoverSpan, {
        y: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      });

      // Create timeline for hover animation
      const tl = gsap.timeline({ paused: true });
      tl.to(originalSpan, { y: "-100%", duration: 0.3, ease: "power2.out" }).to(
        hoverSpan,
        { y: 0, duration: 0.3, ease: "power2.out" },
        0
      );

      return tl;
    }

    const styledCtaBtns = document.querySelectorAll(".about-cta-btn-styled");
    styledCtaBtns.forEach((btn) => {
      const timeline = createSlideUpEffect(btn);
      if (timeline) {
        btn.addEventListener("mouseenter", () => timeline.play());
        btn.addEventListener("mouseleave", () => timeline.reverse());
      }
    });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-parent">
        <div className="about-div1">
          <div className="about-heading1">
            <h1>
              CRAFTING TIMELESS
              <br />
              SPACES WITH
            </h1>
          </div>
        </div>
        <div className="about-div2">
          <div className="about-2">
            <div className="about-studio-col">
              <span>(our studio)</span>
            </div>
            <div className="about-img-col">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Architecture Studio"
              />
            </div>
            <div className="about-heading2">
              <h1>INTENT + IMPACT</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="about-architecture-content">
        <p>
          The DIQRA Architecture style is defined by strong, solid forms with
          subtle elegance, natural balance and enduring appeal.
        </p>
        <p>
          We design spaces for people. No matter the scale of the projects, our
          down-to-earth approach stays the same. We listen first, design second.
          We take the time to understand how you live, work, and move through
          your space.
        </p>
        <a href="#" className="about-cta-btn-styled" ref={ctaBtnRef}>
          <span>Learn more About us</span>
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
