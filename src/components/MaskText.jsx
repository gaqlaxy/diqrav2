import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/MaskText.css";

gsap.registerPlugin(ScrollTrigger);

export default function MaskText({
  phrases,
  className = "",
  duration = 0.75,
  stagger = 0.075,
  start = "top 75%",
  once = true,
  ease = "power3.out",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const lines = containerRef.current.querySelectorAll(".line-mask p");

    gsap.fromTo(
      lines,
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: duration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [phrases, duration, stagger, start, once, ease]);

  return (
    <div ref={containerRef} className={`mask-text-body ${className}`}>
      {phrases.map((phrase, index) => (
        <div key={index} className="line-mask">
          <p>{phrase}</p>
        </div>
      ))}
    </div>
  );
}
