import React, { useEffect } from "react";
import "../styles/ProcessSection.css";
import { gsap } from "gsap";
import SlideUpButton from "../components/SlideUpButton";

const ProcessSection = () => {
  useEffect(() => {
    const styledCtaBtns = document.querySelectorAll(".process-cta-btn-styled");

    styledCtaBtns.forEach((btn) => {
      const createSlideUpEffect = (element) => {
        let span = element.querySelector("span");

        if (!span) {
          const originalText = element.textContent;
          element.innerHTML = `<span>${originalText}</span>`;
          span = element.querySelector("span");
        }

        if (span.querySelector(".text-original")) return;

        const originalText = span.textContent;
        span.innerHTML = `
          <span class="text-original">${originalText}</span>
          <span class="text-hover">${originalText}</span>
        `;

        const originalSpan = span.querySelector(".text-original");
        const hoverSpan = span.querySelector(".text-hover");

        gsap.set(span, {
          overflow: "hidden",
          height: "auto",
          position: "relative",
          display: "block",
        });

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

        const tl = gsap.timeline({ paused: true });
        tl.to(originalSpan, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        }).to(hoverSpan, { y: 0, duration: 0.3, ease: "power2.out" }, 0);

        return tl;
      };

      const timeline = createSlideUpEffect(btn);
      if (timeline) {
        btn.addEventListener("mouseenter", () => timeline.play());
        btn.addEventListener("mouseleave", () => timeline.reverse());
      }
    });
  }, []);

  const processSteps = [
    "Sketch Design",
    "Design Development",
    "Development Application",
    "Interior Design",
    "Building approval plans + documentation",
    "Construction plans + documentation",
  ];

  return (
    <div className="process-section">
      <div className="process-left-column">
        <div className="process-header">(OUR PROCESS)</div>

        <div className="process-image-container">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1200&fit=crop"
            alt="Modern Architecture"
          />
        </div>

        <div className="process-list">
          {processSteps.map((step, index) => (
            <div key={index} className="process-item">
              <div className="process-number">
                ({String(index + 1).padStart(2, "0")})
              </div>
              <div className="process-title">{step}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="process-right-column">
        <div className="process-content-section">
          <p className="process-main-heading">
            Our approach at Diqra Architects is designed to make your journey
            from concept to completion as smooth and enjoyable as possible.
          </p>

          <p className="process-description">
            With our 6-stage process, we prioritise clarity, collaboration, and
            your unique vision. At every step, we'll keep you informed,
            inspired, and involved.
          </p>

          {/* <a href="#" className="process-cta-btn-styled">
            <span>get to know our process</span>
          </a> */}
          <SlideUpButton to="/contact" className="ml-4">
            get to know our process
          </SlideUpButton>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
