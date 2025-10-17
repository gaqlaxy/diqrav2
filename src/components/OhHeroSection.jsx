import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    // Initial hero animations

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
    <div style={styles.body}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .text-original, .text-hover {
          display: block;
        }

        /* About Section Styles */
        .about-parent {
          margin: 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .about-div1 {
          grid-column: span 4;
          grid-row: span 1;
        }

        .about-div2 {
          grid-column: span 4;
          grid-row: span 1;
        }

        .about-img img {
          height: 250px;
          object-fit: cover;
        }

        .about-2 {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 15px;
        }

        .about-studio-col {
          grid-column: 1;
          display: flex;
        }

        .about-studio-col span {
          font-size: 14px;
          font-weight: 400;
          color: #666;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          letter-spacing: 2px;
        }

        .about-img-col {
          grid-column: 2;
          display: flex;
          justify-content: center;
        }

        .about-img-col img {
          height: 250px;
          width: 100%;
          max-width: 400px;
          object-fit: cover;
          border-radius: 8px;
        }

        .about-heading2 {
          grid-column: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-heading2 h1 {
          font-size: 72px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          line-height: 1.2;
          max-width: 100%;
          word-spacing: 2px;
        }

        .about-section h1 {
          font-size: 48px;
          font-weight: bolder;
          line-height: 1.1;
          text-align: center;
          white-space: nowrap;
        }

        .about-heading1 h1 {
          font-size: 72px;
          line-height: 1.3;
          white-space: normal;
          word-spacing: 1px;
          max-width: 100%;
          text-align: left;
        }

        .about-architecture-content {
          margin: 40px auto;
          max-width: 800px;
          padding: 0 20px;
        }

        .about-architecture-content p {
          font-size: 18px;
          line-height: 1.6;
          color: #333;
          font-weight: 400;
        }

        .about-cta-btn-styled {
          margin: 20px auto;
          display: inline-flex;
          align-items: center;
          text-transform: uppercase;
          padding: 10px 18px;
          background: #080807;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: white;
          text-decoration: none;
          font-weight: 400;
          font-size: 18px;
          transition: all 0.3s ease;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          position: relative;
        }

        .about-cta-btn-styled span {
          color: #fff;
          display: block;
          position: relative;
        }

        .about-cta-btn-styled::after {
          content: "";
          width: 8px;
          height: 8px;
          background: #fff;
          border: 2px solid #000;
          border-radius: 50%;
          margin-left: 8px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .about-cta-btn-styled:hover::after {
          background: #fff;
          border-color: #fff;
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .about-parent {
            grid-template-columns: 1fr;
            margin: 5px;
            gap: 25px;
          }

          .about-div1 {
            grid-column: span 1;
            grid-row: span 1;
            order: 1;
          }

          .about-div2 {
            grid-column: span 1;
            grid-row: span 1;
            order: 2;
          }

          .about-2 {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 10px 0;
          }

          .about-studio-col {
            order: 2;
            width: 100%;
          }

          .about-img-col {
            order: 1;
            width: 100%;
          }

          .about-heading2 {
            order: 3;
          }

          .about-img-col img {
            height: 420px;
            width: 100%;
            max-width: none;
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          }

          .about-section h1 {
            font-size: 32px;
            line-height: 1.3;
          }

          .about-architecture-content {
            margin: 30px auto;
            padding: 0 10px;
            max-width: none;
          }

          .about-architecture-content p {
            font-size: 17px;
            line-height: 1.7;
            text-align: left;
          }

          .about-heading1,
          .about-heading2 {
            display: none;
          }

          .about-studio-col {
            justify-content: center;
            margin-top: 15px;
          }

          .about-studio-col span {
            writing-mode: initial;
            text-orientation: initial;
            font-size: 16px;
            font-weight: 500;
            color: #444;
            letter-spacing: 1px;
          }
        }

        /* Large screen responsive design */
        @media (min-width: 1200px) {
          .about-parent {
            margin: 40px;
            gap: 30px;
          }

          .about-heading1 h1,
          .about-heading2 h1 {
            font-size: 96px;
            line-height: 1.1;
          }

          .about-img-col img {
            height: 350px;
            max-width: 600px;
          }

          .about-architecture-content {
            max-width: 1000px;
            padding: 0 40px;
          }

          .about-architecture-content p {
            font-size: 20px;
            line-height: 1.8;
          }

          .about-2 {
            gap: 30px;
          }

          .about-studio-col span {
            font-size: 16px;
            letter-spacing: 3px;
          }
        }
      `}</style>

      <main>
        {/* HERO SECTION */}
        <section style={styles.hero} ref={heroRef} role="banner">
          <div style={styles.heroBgWrapper}>
            <div style={styles.heroBg} ref={heroBgRef}></div>
          </div>
          <div style={styles.heroOverlay}></div>

          {/* HOVER PREVIEW */}
          <div
            style={styles.hoverPreview}
            ref={hoverPreviewRef}
            aria-hidden="true"
          >
            <img
              ref={previewImageRef}
              src="Overlay1.jpeg"
              alt="Architecture project interior preview"
              style={styles.previewImage}
            />
            <div style={styles.previewOverlayText}>
              <h3 ref={previewTitleRef} style={styles.previewTitle}>
                Myrtle Pool House
              </h3>
              <p ref={previewSubtitleRef} style={styles.previewSubtitle}>
                Explore the Project
              </p>
            </div>
          </div>

          {/* Top Bar */}
          <div style={styles.heroTopBar} ref={heroTopBarRef}>
            <div style={styles.heroTopLeft}>
              <div style={styles.featuredLabel} ref={featuredLabelRef}>
                FEATURED PROJECT
              </div>
              <div style={styles.projectTitle} ref={projectTitleRef}>
                MYRTLE POOL HOUSE
              </div>
              <div style={styles.projectYear} ref={projectYearRef}>
                2024
              </div>
            </div>
            <a
              href="#project"
              style={styles.viewProject}
              aria-label="View detailed project information"
              ref={viewProjectRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <span style={styles.viewProjectText}>VIEW PROJECT</span>
              <span style={styles.viewProjectArrow}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={styles.arrow1}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={styles.arrow2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Bottom Hero Text */}
          <div style={styles.heroContent}>
            <h1 ref={heroH1Ref} style={styles.heroH1}>
              The OH Architecture style is defined by strong, solid forms with
              subtle elegance, natural balance and enduring appeal
            </h1>
          </div>

          <div
            style={styles.scrollIndicator}
            ref={scrollIndicatorRef}
            aria-hidden="true"
          >
            (SCROLL DOWN)
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="about-section"
          style={styles.aboutSection}
        >
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

const styles = {
  body: {
    fontFamily: "'PP Neue Montreal Book', sans-serif",

    margin: 0,
    padding: 0,
  },
  hero: {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    background: "#000",
  },
  heroBgWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  heroBg: {
    position: "absolute",
    top: "-15%",
    left: 0,
    width: "100%",
    height: "130%",
    background:
      'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url("https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/38h6fE1nuT49Zt2Za3kKhw.jpeg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    willChange: "transform",
  },
  heroOverlay: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "40%",
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 100%)",
    zIndex: 2,
    pointerEvents: "none",
  },
  hoverPreview: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#0a0a0a",
    transform: "translateY(100%)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0,
    transform: "translateY(100px) scale(1.1)",
    filter: "brightness(0.9) contrast(1.1)",
  },
  previewOverlayText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 10,
    pointerEvents: "none",
  },
  previewTitle: {
    fontSize: "4rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    marginBottom: "1rem",
    textTransform: "uppercase",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
    transform: "translateY(60px)",
    opacity: 0,
  },
  previewSubtitle: {
    fontSize: "1.2rem",
    fontWeight: 300,
    letterSpacing: "0.1em",
    opacity: 0,
    transform: "translateY(40px)",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
  },
  heroTopBar: {
    position: "absolute",
    top: "14rem",
    left: 0,
    width: "100%",
    padding: "2.5rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 101,
  },
  heroTopLeft: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    width: "100%",
  },
  featuredLabel: {
    fontSize: "0.95rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    flex: 1,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
  },
  projectTitle: {
    fontSize: "0.95rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    flex: 1,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
    textAlign: "center",
  },
  projectYear: {
    fontSize: "0.95rem",
    letterSpacing: "0.15em",
    fontWeight: 300,
    opacity: 0.8,
    flex: 1,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
    textAlign: "center",
  },
  heroContent: {
    position: "absolute",
    bottom: "1.5rem",
    left: "1.5rem",
    maxWidth: "700px",
    zIndex: 101,
  },
  heroH1: {
    fontSize: "32px",
    fontWeight: 400,
    lineHeight: 1.3,
    marginBottom: 0,
    letterSpacing: "-0.02em",
    color: "#fcfcfc",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  },
  viewProject: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    background: "transparent",
    padding: "8px 0",
    fontWeight: 400,
    fontSize: "0.85rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    position: "relative",
    whiteSpace: "nowrap",
    marginLeft: "2rem",
    flexShrink: 0,
    overflow: "hidden",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#fcfcfc",
    height: "1.2em",
    cursor: "pointer",
  },
  viewProjectText: {
    position: "relative",
    display: "inline-block",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  viewProjectArrow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1rem",
    height: "1rem",
    position: "relative",
    overflow: "hidden",
    marginLeft: "0.5rem",
  },
  arrow1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "translate(0, 0)",
  },
  arrow2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "translate(-150%, 150%)",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "3rem",
    right: "3rem",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.7,
    writingMode: "vertical-rl",
    zIndex: 101,
    fontWeight: 400,
  },
  aboutSection: {
    background: "#fcfcfc",
    position: "relative",
    zIndex: 10,
  },
};
