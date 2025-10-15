import React, { useEffect } from "react";
import "../styles/OhHeroSection.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const OhHeroSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background effect
    gsap.to("#heroBg", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Hero content fade out on scroll
    gsap.to(".hero-content", {
      opacity: 0,
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "70% top",
        scrub: 1,
      },
    });

    // Initial hero animations
    // gsap.from(".hero-top-bar", {
    //   y: -50,
    //   opacity: 0,
    //   duration: 1.2,
    //   ease: "power3.out",
    //   delay: 0.3,
    // });

    // gsap.from(".featured-label", {
    //   opacity: 0,
    //   x: -20,
    //   duration: 1,
    //   delay: 0.6,
    // });

    // gsap.from(".project-title", {
    //   opacity: 0,
    //   x: -20,
    //   duration: 1,
    //   delay: 0.7,
    // });

    // gsap.from(".project-year", {
    //   opacity: 0,
    //   x: -20,
    //   duration: 1,
    //   delay: 0.8,
    // });

    // gsap.from(".hero-content h1", {
    //   y: 60,
    //   opacity: 0,
    //   duration: 1.4,
    //   ease: "power3.out",
    //   delay: 0.5,
    // });

    // gsap.from(".scroll-indicator", {
    //   opacity: 0,
    //   duration: 1,
    //   delay: 1.2,
    // });

    // About section animations
    gsap.from(".about-left h2", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
      },
    });

    gsap.from(".about-left .subtitle", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
      },
    });

    gsap.from(".about-right p", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
      },
    });

    gsap.from(".stat-item", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
      },
    });

    // Hover preview effect
    const viewProject = document.querySelector(".view-project");
    const hoverPreview = document.getElementById("hoverPreview");
    const previewImage = hoverPreview.querySelector("img");
    const previewText = document.querySelector(".preview-overlay-text");
    const previewTitle = previewText.querySelector("h3");
    const previewSubtitle = previewText.querySelector("p");

    const tl = gsap.timeline({ paused: true });

    tl.to(hoverPreview, {
      y: 0,
      duration: 0.9,
      ease: "power4.inOut",
    })
      .to(
        previewImage,
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
        previewTitle,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        previewSubtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      );

    const playAnimation = () => tl.play();
    const reverseAnimation = () => tl.reverse();

    viewProject.addEventListener("mouseenter", playAnimation);
    viewProject.addEventListener("mouseleave", reverseAnimation);
    viewProject.addEventListener("focus", playAnimation);
    viewProject.addEventListener("blur", reverseAnimation);

    return () => {
      viewProject.removeEventListener("mouseenter", playAnimation);
      viewProject.removeEventListener("mouseleave", reverseAnimation);
      viewProject.removeEventListener("focus", playAnimation);
      viewProject.removeEventListener("blur", reverseAnimation);
    };
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero" role="banner">
        <div className="hero-bg-wrapper">
          <div className="hero-bg" id="heroBg"></div>
        </div>

        {/* Hover Preview */}
        <div className="hover-preview" id="hoverPreview" aria-hidden="true">
          <img
            src="https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/38h6fE1nuT49Zt2Za3kKhw.jpeg"
            alt="Architecture project interior preview"
          />
          <div className="preview-overlay-text">
            <h3>Myrtle Pool House</h3>
            <p>Explore the Project</p>
          </div>
        </div>

        {/* Top Bar */}
        <div className="hero-top-bar">
          <div className="hero-top-left">
            <div className="featured-label">FEATURED PROJECT</div>
            <div className="project-title">MYRTLE POOL HOUSE</div>
            <div className="project-year">2024</div>
          </div>
          <a
            href="#project"
            className="view-project"
            aria-label="View detailed project information"
          >
            VIEW PROJECT
          </a>
        </div>

        {/* Bottom Hero Text */}
        <div className="hero-content">
          <h1>
            The OH Architecture style is defined by strong, solid forms with
            subtle elegance, natural balance and enduring appeal
          </h1>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          (SCROLL DOWN)
        </div>
      </section>

      {/* ABOUT SECTION */}
    </main>
  );
};

export default OhHeroSection;
