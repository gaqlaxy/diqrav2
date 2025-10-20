import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/OhHeroSection.css";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  "https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/38h6fE1nuT49Zt2Za3kKhw.jpeg";

export default function OhHeroSection() {
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

  const [heroLoaded, setHeroLoaded] = useState(false);

  // 1) Preload hero image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = HERO_IMG;
    const onLoad = () => setHeroLoaded(true);
    const onError = () => {
      // fallback: still mark loaded so UI and animations run
      setHeroLoaded(true);
      console.warn("Hero image failed to load, continuing anyway.");
    };
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, []);

  // 2) Initialize GSAP only after hero image is loaded
  useEffect(() => {
    if (!heroLoaded) return;

    // small fade-in for hero wrapper (visual polish)
    gsap.set(heroRef.current, { autoAlpha: 0 });
    gsap.to(heroRef.current, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power1.out",
    });

    // Parallax background effect
    const parallaxTween = gsap.to(heroBgRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // pin the hero while preserving proper measurement after load
    const pinTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
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

    // CTA Button slide-up effect (same function but run after load)
    function createSlideUpEffect(element) {
      if (!element) return null;
      let span = element.querySelector("span");
      if (!span) {
        const originalText = element.textContent;
        element.innerHTML = `<span>${originalText}</span>`;
        span = element.querySelector("span");
      }
      if (span.querySelector(".text-original")) return null;
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
      gsap.set(originalSpan, { y: 0, position: "relative", display: "block" });
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

    // Refresh ScrollTrigger after all is set (ensures correct measurements)
    ScrollTrigger.refresh();

    // cleanup on unmount
    return () => {
      tl.kill();
      if (ctaTimeline) ctaTimeline.kill();
      parallaxTween.kill();
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [heroLoaded]);

  // CTA hover handlers (unchanged)
  const handleCtaMouseEnter = () => {
    const span = ctaBtnRef.current?.querySelector("span");
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
    const span = ctaBtnRef.current?.querySelector("span");
    if (span) {
      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");
      if (originalSpan && hoverSpan) {
        gsap.to(originalSpan, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(hoverSpan, { y: "100%", duration: 0.3, ease: "power2.out" });
      }
    }
  };

  const handleMouseEnter = () => timelineRef.current?.play();
  const handleMouseLeave = () => timelineRef.current?.reverse();
  const handleFocus = () => timelineRef.current?.play();
  const handleBlur = () => timelineRef.current?.reverse();

  return (
    <div className="oh-hero-body">
      <main>
        {/* HERO SECTION */}
        <section
          className={`oh-hero ${heroLoaded ? "loaded" : ""}`}
          ref={heroRef}
          role="banner"
        >
          <div className="oh-hero-bg-wrapper">
            {/* Set background inline only after preload; we still render the element so layout is stable */}
            <div
              className={`oh-hero-bg ${heroLoaded ? "loaded" : ""}`}
              ref={heroBgRef}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${HERO_IMG})`,
              }}
              aria-hidden="true"
            />
          </div>

          <div className="oh-hero-overlay" />

          {/* HOVER PREVIEW */}
          <div
            className="oh-hover-preview"
            ref={hoverPreviewRef}
            aria-hidden="true"
          >
            <img
              ref={previewImageRef}
              src="/src/assets/Hero1.jpeg"
              alt="Architecture project interior preview"
              className="oh-preview-image"
            />
            {/* <div className="oh-preview-overlay-text">
              <h3 ref={previewTitleRef} className="oh-preview-title">
                Myrtle Pool House
              </h3>
              <p ref={previewSubtitleRef} className="oh-preview-subtitle">
                Explore the Project
              </p>
            </div> */}
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

        {/* ABOUT SECTION (unchanged) */}
        <section id="about" className="about-section">
          {/* ... your about content here (no changes) ... */}
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
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=869&auto=format&fit=crop"
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
