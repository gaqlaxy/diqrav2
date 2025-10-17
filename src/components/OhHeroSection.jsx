import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/OhHeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function OhHeroSection() {
  // All refs preserved
  const heroBgRef = useRef(null);
  const heroTopBarRef = useRef(null);
  const featuredLabelRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectYearRef = useRef(null);
  const heroH1Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const viewProjectRef = useRef(null);
  const hoverPreviewRef = useRef(null);
  const previewImageRef = useRef(null);
  const previewTitleRef = useRef(null);
  const previewSubtitleRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const ctaBtnRef = useRef(null);

  useEffect(() => {
    // Parallax background effect
    gsap.to(heroBgRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Hover preview timeline
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    tl.to(hoverPreviewRef.current, {
      y: 0,
      duration: 0.9,
      ease: "power4.inOut",
    })
      .to(
        previewImageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.7"
      )
      .to(
        previewTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        previewSubtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      );

    // CTA Button slide-up effect
    function createSlideUpEffect(element) {
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

      const ctaTl = gsap.timeline({ paused: true });
      ctaTl
        .to(originalSpan, { y: "-100%", duration: 0.3, ease: "power2.out" })
        .to(hoverSpan, { y: 0, duration: 0.3, ease: "power2.out" }, 0);

      return ctaTl;
    }

    const ctaTimeline = createSlideUpEffect(ctaBtnRef.current);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (ctaTimeline) ctaTimeline.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  const handleFocus = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const handleBlur = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  const handleCtaMouseEnter = () => {
    const span = ctaBtnRef.current.querySelector("span");
    if (span) {
      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");

      if (originalSpan && hoverSpan) {
        gsap.to(originalSpan, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(hoverSpan, { y: 0, duration: 0.3, ease: "power2.out" });
      }
    }
  };

  const handleCtaMouseLeave = () => {
    const span = ctaBtnRef.current.querySelector("span");
    if (span) {
      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");

      if (originalSpan && hoverSpan) {
        gsap.to(originalSpan, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(hoverSpan, { y: "100%", duration: 0.3, ease: "power2.out" });
      }
    }
  };

  return (
    <div className="oh-hero-body">
      <main>
        {/* HERO SECTION */}
        <section className="oh-hero" ref={heroRef} role="banner">
          <div className="oh-hero-bg-wrapper">
            <div className="oh-hero-bg" ref={heroBgRef}></div>
          </div>
          <div className="oh-hero-overlay"></div>

          {/* HOVER PREVIEW */}
          <div
            className="oh-hover-preview"
            ref={hoverPreviewRef}
            aria-hidden="true"
          >
            <img
              ref={previewImageRef}
              src="Overlay1.jpeg"
              alt="Architecture project interior preview"
              className="oh-preview-image"
            />
            <div className="oh-preview-overlay-text">
              <h3 ref={previewTitleRef} className="oh-preview-title">
                Myrtle Pool House
              </h3>
              <p ref={previewSubtitleRef} className="oh-preview-subtitle">
                Explore the Project
              </p>
            </div>
          </div>

          {/* Top Bar */}
          <div className="oh-hero-top-bar" ref={heroTopBarRef}>
            <div className="oh-hero-top-left">
              <div className="oh-featured-label" ref={featuredLabelRef}>
                FEATURED PROJECT
              </div>
              <div className="oh-project-title" ref={projectTitleRef}>
                MYRTLE POOL HOUSE
              </div>
              <div className="oh-project-year" ref={projectYearRef}>
                2024
              </div>
            </div>
            <a
              href="#project"
              className="oh-view-project"
              aria-label="View detailed project information"
              ref={viewProjectRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <span className="oh-view-project-text">VIEW PROJECT</span>
              <span className="oh-view-project-arrow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="oh-arrow-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="oh-arrow-2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Bottom Hero Text */}
          <div className="oh-hero-content">
            <h1 ref={heroH1Ref} className="oh-hero-h1">
              The OH Architecture style is defined by strong, solid forms with
              subtle elegance, natural balance and enduring appeal
            </h1>
          </div>

          <div
            className="oh-scroll-indicator"
            ref={scrollIndicatorRef}
            aria-hidden="true"
          >
            (SCROLL DOWN)
          </div>
        </section>

        {/* ABOUT SECTION */}
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
              The DIQRA Architecture style is defined by strong, solid forms
              with subtle elegance, natural balance and enduring appeal.
            </p>
            <p>
              We design spaces for people. No matter the scale of the projects,
              our down-to-earth approach stays the same. We listen first, design
              second. We take the time to understand how you live, work, and
              move through your space.
            </p>
            <a
              href="#"
              className="about-cta-btn-styled"
              ref={ctaBtnRef}
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
            >
              <span>Learn more About us</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
