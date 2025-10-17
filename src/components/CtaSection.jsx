import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/CtaSection.css";

export default function CtaSection() {
  const btnRef = useRef(null);

  useEffect(() => {
    const element = btnRef.current;
    if (!element) return;

    let span = element.querySelector("span");
    if (!span) return;

    const originalText = span.textContent;
    span.innerHTML = `
      <span class="text-original">${originalText}</span>
      <span class="text-hover">${originalText}</span>
    `;

    const originalSpan = span.querySelector(".text-original");
    const hoverSpan = span.querySelector(".text-hover");

    gsap.set(span, {
      overflow: "hidden",
      position: "relative",
      display: "block",
    });

    gsap.set(originalSpan, { y: 0, position: "relative", display: "block" });
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

    element.addEventListener("mouseenter", () => tl.play());
    element.addEventListener("mouseleave", () => tl.reverse());

    return () => {
      element.removeEventListener("mouseenter", () => tl.play());
      element.removeEventListener("mouseleave", () => tl.reverse());
    };
  }, []);

  return (
    <section className="cta-btn">
      <div className="cta-section">
        <h1 className="cta-heading">FOCUSED ON QUALITY</h1>
        <h1 className="cta-heading2">DRIVEN BY CREATIVITY</h1>
      </div>
      <div className="cta-btn-section">
        <a href="#" className="cta-btn-styled" ref={btnRef}>
          <span>tell us about your project</span>
        </a>
      </div>
    </section>
  );
}
