import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../styles/SlideUpButton.css";

const SlideUpButton = ({
  to,
  onClick,
  children = "View All",
  className = "",
  delay = 0,
}) => {
  const btnRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const element = btnRef.current;
    if (!element || element.hasAttribute("data-gsap-initialized")) return;

    const span = element.querySelector("span");

    // ✅ Stop re-wrapping if already structured
    if (
      span.querySelector(".text-original") ||
      span.querySelector(".text-hover")
    ) {
      element.setAttribute("data-gsap-initialized", "true");
      return;
    }

    const text = span.textContent.trim();
    span.innerHTML = `
      <span class="text-original">${text}</span>
      <span class="text-hover">${text}</span>
    `;

    const originalSpan = span.querySelector(".text-original");
    const hoverSpan = span.querySelector(".text-hover");

    // Wait for layout paint to get the correct height
    requestAnimationFrame(() => {
      const slideDistance = originalSpan.offsetHeight || 24;

      gsap.set(span, {
        overflow: "hidden",
        position: "relative",
        display: "block",
        height: `${slideDistance}px`,
      });
      gsap.set(originalSpan, { y: 0, position: "relative", display: "block" });
      gsap.set(hoverSpan, {
        y: slideDistance,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "block",
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(originalSpan, { y: -slideDistance, duration: 0.4 }, 0)
        .to(hoverSpan, { y: 0, duration: 0.4 }, 0)
        .to(originalSpan, { opacity: 0, duration: 0.1 }, 0.2)
        .to(hoverSpan, { opacity: 1, duration: 0.1 }, 0.2);

      tl.eventCallback("onReverseComplete", () => {
        gsap.set(originalSpan, { y: 0, opacity: 1 });
        gsap.set(hoverSpan, { y: slideDistance, opacity: 0 });
      });

      element.addEventListener("mouseenter", () => tl.play());
      element.addEventListener("mouseleave", () => tl.reverse());

      element.setAttribute("data-gsap-initialized", "true");
      tlRef.current = tl;
    });
  }, []);

  const Element = to ? Link : "button";

  return (
    <Element
      ref={btnRef}
      to={to}
      onClick={onClick}
      className={`cta-btn-styled ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span>{children}</span>
    </Element>
  );
};

export default SlideUpButton;
