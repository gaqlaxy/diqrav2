import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Animate overlay menu open/close
    const overlay = document.querySelector(".Navbar-overlay-menu");
    const overlayContent = document.querySelector(".Navbar-overlay-content");

    if (isMenuOpen) {
      // Opening animation
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );

      // Stagger animate menu items
      gsap.fromTo(
        ".Navbar-overlay-nav-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
        }
      );

      // Animate footer links
      gsap.fromTo(
        ".Navbar-overlay-footer-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      // Closing animation
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  useEffect(() => {
    const createSlideUpEffect = (element) => {
      let span = element.querySelector("span");

      if (!span) {
        const originalText = element.textContent;
        element.innerHTML = `<span>${originalText}</span>`;
        span = element.querySelector("span");
      }

      if (span.querySelector(".text-original")) return; // avoid duplicate init

      const originalText = span.textContent;
      span.innerHTML = `
        <span class="text-original">${originalText}</span>
        <span class="text-hover">${originalText}</span>
      `;

      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");
      const slideDistance = originalSpan.offsetHeight;

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
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          hoverSpan,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(originalSpan, { opacity: 0, duration: 0.1 }, 0.15)
        .to(hoverSpan, { opacity: 1, duration: 0.1 }, 0.15);

      tl.eventCallback("onReverseComplete", () => {
        gsap.set(originalSpan, { y: 0, opacity: 1 });
        gsap.set(hoverSpan, { y: `${slideDistance}px`, opacity: 0 });
      });

      return tl;
    };

    // Apply to all nav animated elements
    const animatedElements = document.querySelectorAll(
      ".Navbar-link-animated, .Navbar-contact-btn, .Navbar-menu-btn, .Navbar-overlay-nav-item, .Navbar-overlay-footer-link"
    );

    const timelines = new Map();

    animatedElements.forEach((element) => {
      const timeline = createSlideUpEffect(element);
      if (timeline) {
        timelines.set(element, timeline);

        const handleMouseEnter = () => {
          timeline.play();
        };

        const handleMouseLeave = () => {
          timeline.reverse();
        };

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup functions
        element._cleanupHover = () => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    // Cleanup on unmount
    return () => {
      animatedElements.forEach((element) => {
        if (element._cleanupHover) {
          element._cleanupHover();
        }
      });
      timelines.clear();
    };
  }, [isMenuOpen]);

  const navItems = ["WORKS", "STUDIO", "PROCESS", "GALLERY"];

  return (
    <>
      {/* Main Navigation */}
      <nav className="Navbar">
        <div className="Navbar-container">
          <div className="Navbar-content">
            {/* Logo - Hidden when scrolled */}
            <Link
              to="/"
              className={`Navbar-logo ${
                isScrolled ? "Navbar-logo-hidden" : ""
              }`}
            >
              OH Architecture
            </Link>

            {/* Desktop Nav Items - Hidden when scrolled or on mobile */}
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

            {/* Right Side Buttons */}
            <div className="Navbar-actions">
              {/* Contact Button */}
              <button className="Navbar-contact-btn">
                <span>GET IN TOUCH</span>
                <span className="Navbar-contact-dot"></span>
              </button>

              {/* Menu Button */}
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

      {/* Full Screen Overlay Menu */}
      <div
        className={`Navbar-overlay-menu ${
          isMenuOpen ? "Navbar-overlay-menu-open" : ""
        }`}
      >
        <div className="Navbar-overlay-container">
          {/* Overlay Header */}
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

          {/* Overlay Content */}
          <div className="Navbar-overlay-content">
            {/* Main Menu Items */}
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

            {/* Footer Links */}
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
