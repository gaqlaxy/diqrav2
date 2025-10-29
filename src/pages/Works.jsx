import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import projectsData from "../data/projects-data.json";

export default function HorizontalGallery() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Use all projects from JSON
  const projects = projectsData.projects;

  return (
    <div className="gallery-container">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <h1 className="mobile-title">WORKS</h1>
          <div className="mobile-links">
            <a href="#" className="uppercase tracking-wide">
              IN PROGRESS →
            </a>
            <a href="#" className="uppercase tracking-wide">
              Interior →
            </a>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div
        ref={scrollContainerRef}
        className={
          isMobile ? "scroll-container-mobile" : "scroll-container-desktop"
        }
      >
        {/* Projects Grid */}
        <div
          className={
            isMobile ? "projects-grid-mobile" : "projects-grid-desktop"
          }
        >
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              to={`/project/${project.slug}`}
              className={`project-card ${idx % 2 === 0 ? "tall" : "wide"}`}
            >
              <div className="project-inner">
                <img src={project.thumbnail} alt={project.title} />
                <div className="overlay" />
                <div className="project-title-container">
                  <h3>{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="desktop-header">
          <div className="works-title">
            <h1>WORKS</h1>
          </div>

          <div className="scroll-indicator">
            <span className="scroll-text">SCROLL DOWN TO EXPLORE</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="progress-percent">
              ({Math.round(scrollProgress)}%)
            </span>
          </div>
          <div className="desktop-links">
            <a href="#">IN PROGRESS →</a>
            <a href="#">INTERIOR →</a>
          </div>
        </div>
      )}

      {isMobile && <Footer />}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .gallery-container {
          width: 100%;
          height: 100vh;
          background: white;
          overflow: hidden;
          position: relative;
        }

        /* Mobile Styles */
        .mobile-header {
          padding: 1.5rem;
          position: static;
        }

        .mobile-title {
          font-size: 3.75rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: 0px;
        }

        /* Desktop Scroll Container */
        .scroll-container-desktop {
          display: flex;
          align-items: center;
          overflow-x: auto;
          overflow-y: hidden;
          height: 100%;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scroll-container-desktop::-webkit-scrollbar {
          display: none;
        }

        .scroll-container-mobile {
          overflow-y: auto;
          height: calc(100vh - 120px);
          padding: 0 1.5rem 1.5rem;
        }

        /* Projects Grid */
        .projects-grid-desktop {
          display: flex;
          align-items: end;
          gap: 1.5rem;
          padding: 0 5rem;
        }

        .projects-grid-mobile {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        /* Project Cards */
        .project-card {
          flex-shrink: 0;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .project-card.tall {
          width: 320px;
          height: 384px;
        }

        .project-card.wide {
          width: 384px;
          height: 320px;
        }

        @media (max-width: 768px) {
          .project-card.tall,
          .project-card.wide {
            width: 100%;
            height: 256px;
          }
          .works-title {
            position: static !important;
            bottom: auto;
            left: auto;
            margin: 1.5rem;
          }

          .works-title h1 {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .gallery-container {
            height: auto !important;
            overflow: visible !important;
            margin-top: 100px;
          }

          .scroll-container-mobile {
            height: auto !important;
            overflow-y: visible !important;
          }

          .works-title,
          .desktop-links,
          .scroll-indicator {
            display: none !important;
          }

          .mobile-header {
            position: relative !important;
            top: 0;
            left: 0;
            margin-bottom: 1rem;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .mobile-links {
            display: flex;
            flex-direction: column;
            font-size: 0.875rem;
            font-weight: 500;
          }
        }

        .project-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .project-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover img {
          transform: scale(1.1);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
        }

        .project-card:hover .overlay {
          background: rgba(0, 0, 0, 0.2);
        }

        .project-title-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.4),
            transparent
          );
        }

        .project-title-container h3 {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0;
        }

        /* Fixed Desktop Elements */
        .desktop-header {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 10;
          display: flex;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          color: #000;
          gap: 2rem;
          background: transparent;
        }

        .works-title h1 {
          font-size: 120px;
          font-weight: 400;
          letter-spacing: -0.03em;
          margin: 0;
          color: #000;
        }

        .desktop-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .desktop-links a {
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
          color: #000;
          transition: opacity 0.3s ease;
        }

        .desktop-links a:hover {
          opacity: 0.7;
        }

        .scroll-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .scroll-text {
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #000;
        }

        .progress-bar {
          width: 200px;
          height: 4px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #000;
          transition: width 0.3s ease;
        }

        .progress-percent {
          font-size: 0.9rem;
          opacity: 0.8;
          color: #000;
        }
      `}</style>
    </div>
  );
}
