import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Opening/closing overlay clip-path animation
    const overlay = document.querySelector(".Navbar-overlay-menu");

    if (isMenuOpen) {
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" }
      );

      // Animate children after overlay is visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gsap.fromTo(
            ".Navbar-overlay-nav-item",
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              delay: 0.05,
              ease: "power2.out",
            }
          );

          gsap.fromTo(
            ".Navbar-overlay-footer-link",
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              delay: 0.25,
              ease: "power2.out",
            }
          );
        });
      });
    } else {
      if (overlay) {
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 600);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const createSlideUpEffect = (element) => {
    if (!element) return null;
    let span = element.querySelector("span");

    if (!span) {
      const originalText = element.textContent.trim();
      element.innerHTML = `<span>${originalText}</span>`;
      span = element.querySelector("span");
    }

    if (span.querySelector(".navbar-text-original")) return null;

    const originalText = span.textContent;
    span.innerHTML = `
    <span class="navbar-text-original">${originalText}</span>
    <span class="navbar-text-hover">${originalText}</span>
  `;

    const originalSpan = span.querySelector(".navbar-text-original");
    const hoverSpan = span.querySelector(".navbar-text-hover");
    const slideDistance = originalSpan.offsetHeight || 32;

    gsap.set(span, {
      overflow: "hidden",
      position: "relative",
      display: "block",
      height: "auto",
    });

    gsap.set(originalSpan, { y: 0, position: "relative", display: "block" });
    gsap.set(hoverSpan, {
      y: `${slideDistance}px`,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      display: "block",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(originalSpan, {
      y: `-${slideDistance}px`,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .to(
        hoverSpan,
        {
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      )
      .to(originalSpan, { opacity: 0, duration: 0.1 }, 0.2)
      .to(hoverSpan, { opacity: 1, duration: 0.1 }, 0.2);

    tl.eventCallback("onReverseComplete", () => {
      gsap.set(originalSpan, { y: 0, opacity: 1 });
      gsap.set(hoverSpan, { y: `${slideDistance}px`, opacity: 0 });
    });

    return tl;
  };

  // Initialize hover for always-visible elements
  useEffect(() => {
    const selectors = [
      ".Navbar-link-animated",
      ".Navbar-contact-btn",
      ".Navbar-menu-btn",
    ];

    const attachHover = (el) => {
      const tl = createSlideUpEffect(el);
      if (!tl) return null;
      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    };

    const elements = document.querySelectorAll(selectors.join(", "));
    const cleanups = [];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elements.forEach((el) => {
          const cleanup = attachHover(el);
          if (cleanup) cleanups.push(cleanup);
        });
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // Initialize hover for overlay items when menu opens
  useEffect(() => {
    if (!isMenuOpen) return;

    let cancel = false;
    requestAnimationFrame(() => {
      if (cancel) return;
      requestAnimationFrame(() => {
        const overlayItems = document.querySelectorAll(
          ".Navbar-overlay-nav-item, .Navbar-overlay-footer-link, .Navbar-close-btn"
        );
        overlayItems.forEach((el) => {
          if (el._hoverInitialized) return;
          const tl = createSlideUpEffect(el);
          if (!tl) return;
          const onEnter = () => tl.play();
          const onLeave = () => tl.reverse();
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          el._hoverCleanup = () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            delete el._hoverCleanup;
            delete el._hoverInitialized;
          };
          el._hoverInitialized = true;
        });
      });
    });

    return () => {
      cancel = true;
      const overlayItems = document.querySelectorAll(
        ".Navbar-overlay-nav-item, .Navbar-overlay-footer-link, .Navbar-close-btn"
      );
      overlayItems.forEach((el) => {
        if (el._hoverCleanup) el._hoverCleanup();
      });
    };
  }, [isMenuOpen]);

  const navItems = ["WORKS", "STUDIO", "PROCESS", "GALLERY"];

  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-container">
          <div className="Navbar-content">
            <Link
              to="/"
              className={`Navbar-logo ${
                isScrolled ? "Navbar-logo-hidden" : ""
              }`}
            >
              <img src="/Diqra.png" alt="" />
            </Link>

            <div
              className={`Navbar-links ${
                isScrolled ? "Navbar-links-hidden" : ""
              }`}
            >
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="Navbar-link Navbar-link-animated"
                >
                  <span>{item}</span>
                </Link>
              ))}
            </div>

            <div className="Navbar-actions">
              <button
                className={`Navbar-contact-btn ${
                  isScrolled ? "Navbar-contact-btn-visible" : ""
                }`}
              >
                <span>GET IN TOUCH</span>
                <span className="Navbar-contact-dot" aria-hidden="true" />
              </button>

              <button
                onClick={() => setIsMenuOpen(true)}
                className={`Navbar-menu-btn ${
                  isScrolled ? "Navbar-menu-btn-visible" : ""
                }`}
              >
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`Navbar-overlay-menu ${
          isMenuOpen ? "Navbar-overlay-menu-open" : ""
        }`}
        ref={overlayRef}
      >
        <div className="Navbar-overlay-container">
          <div className="Navbar-overlay-header">
            <Link to="/" className="Navbar-overlay-logo">
              OH Architecture
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="Navbar-close-btn"
            >
              <span>CLOSE</span>
            </button>
          </div>

          <div className="Navbar-overlay-content">
            <nav className="Navbar-overlay-nav">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="Navbar-overlay-nav-item"
              >
                <span>HOME</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="Navbar-overlay-nav-item"
                >
                  <span>{item}</span>
                </Link>
              ))}
            </nav>

            <div className="Navbar-overlay-footer">
              <Link to="/instagram" className="Navbar-overlay-footer-link">
                <span>INSTAGRAM</span>
              </Link>
              <Link to="/privacy" className="Navbar-overlay-footer-link">
                <span>PRIVACY POLICY</span>
              </Link>
              <Link to="/terms" className="Navbar-overlay-footer-link">
                <span>TERMS OF SERVICE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
