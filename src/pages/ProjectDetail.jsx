import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import projectsData from "../data/projects-data.json";
import Footer from "../components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    // Find the current project
    const currentProject = projectsData.projects.find((p) => p.slug === slug);

    if (!currentProject) {
      navigate("/works");
      return;
    }

    setProject(currentProject);

    // Find the next and previous projects
    const currentIndex = projectsData.projects.findIndex(
      (p) => p.slug === slug
    );
    const nextIndex = (currentIndex + 1) % projectsData.projects.length;
    const prevIndex =
      (currentIndex - 1 + projectsData.projects.length) %
      projectsData.projects.length;

    setNextProject(projectsData.projects[nextIndex]);
    setPrevProject(projectsData.projects[prevIndex]);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  const parallaxOffset = scrollY * 0.6;
  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <div className="project-detail">
      {/* Hero Section with Parallax */}
      <section className="project-hero" ref={heroRef}>
        <div
          className="hero-background"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            backgroundImage: `url(${project.images[0]})`,
          }}
        />
        <div
          className="hero-overlay"
          style={{ opacity: opacity * 0.7 + 0.3 }}
        />
        <div className="hero-content" style={{ opacity }}>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta">
            <span className="location">{project.location}</span>
            <span className="country">{project.category}</span>
          </div>
          <Link to="/works" className="back-link">
            ← Back to Works
          </Link>
          <div className="scroll-indicator">
            <span>(SCROLL TO EXPLORE)</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="project-info">
        <div className="info-grid">
          <div className="info-description">
            <h2>About the Project</h2>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="info-details">
            <h3>Project Details</h3>
            <dl>
              <dt>Year</dt>
              <dd>{project.year}</dd>
              <dt>Client</dt>
              <dd>{project.details.client}</dd>
              <dt>Area</dt>
              <dd>{project.details.area}</dd>
              <dt>Status</dt>
              <dd>{project.details.status}</dd>
              <dt>Architect</dt>
              <dd>{project.details.architect}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="project-gallery">
        {project.images.slice(1).map((image, index) => (
          <div key={index} className="gallery-image">
            <img src={image} alt={`${project.title} - Image ${index + 2}`} />
          </div>
        ))}
      </section>

      {/* Navigation Projects */}
      {(prevProject || nextProject) && (
        <section className="navigation-projects">
          {prevProject && (
            <div className="nav-project prev-project">
              <div className="nav-project-content">
                <span className="nav-label">Previous Project</span>
                <Link to={`/project/${prevProject.slug}`} className="nav-link">
                  <span className="arrow-left">←</span>
                  <h2>{prevProject.title}</h2>
                </Link>
              </div>
              <div className="nav-project-image">
                <Link to={`/project/${prevProject.slug}`}>
                  <img src={prevProject.thumbnail} alt={prevProject.title} />
                </Link>
              </div>
            </div>
          )}

          {nextProject && (
            <div className="nav-project next-project">
              <div className="nav-project-content">
                <span className="nav-label">Next Project</span>
                <Link to={`/project/${nextProject.slug}`} className="nav-link">
                  <h2>{nextProject.title}</h2>
                  <span className="arrow-right">→</span>
                </Link>
              </div>
              <div className="nav-project-image">
                <Link to={`/project/${nextProject.slug}`}>
                  <img src={nextProject.thumbnail} alt={nextProject.title} />
                </Link>
              </div>
            </div>
          )}
        </section>
      )}

      <Footer />

      <style jsx>{`
        .project-detail {
          width: 100%;
          background: white;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.5rem;
        }

        /* Hero Section with Parallax */
        .project-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-background {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 120%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          will-change: transform;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 6rem 5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .back-link {
          display: inline-block;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin-top: 2rem;
          transition: color 0.3s ease;
          align-self: flex-start;
        }

        .back-link:hover {
          color: #fff;
        }

        .project-title {
          font-size: 8rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0 0 2rem 0;
          line-height: 0.9;
          color: white;
          text-transform: uppercase;
        }

        .project-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: auto;
        }

        .location {
          font-size: 1.3rem;
          color: white;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .country {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 4rem;
          right: 5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
        }

        .scroll-line {
          width: 2px;
          height: 40px;
          background: white;
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }

        /* Project Info */
        .project-info {
          padding: 8rem 5rem;
          max-width: 1600px;
          margin: 0 auto;
          background: white;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 6rem;
        }

        .info-description h2 {
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          color: #000;
        }

        .info-description p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tag {
          padding: 0.5rem 1rem;
          background: #f5f5f5;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #666;
        }

        .info-details h3 {
          font-size: 1.3rem;
          font-weight: 500;
          margin-bottom: 2rem;
          color: #000;
        }

        .info-details dl {
          display: grid;
          gap: 1.5rem;
        }

        .info-details dt {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .info-details dd {
          font-size: 1.1rem;
          color: #333;
          margin: 0;
        }

        /* Gallery */
        .project-gallery {
          display: grid;
          gap: 3rem;
          padding: 0 5rem 6rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .gallery-image {
          width: 100%;
          height: auto;
        }

        .gallery-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Navigation Projects */
        .navigation-projects {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 6rem 5rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .nav-project {
          display: flex;
          flex-direction: column;
        }

        .nav-project-content {
          margin-bottom: 2rem;
        }

        .nav-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #999;
          display: block;
          margin-bottom: 1rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          text-decoration: none;
          color: #000;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover {
          opacity: 0.7;
        }

        .nav-link h2 {
          font-size: 2rem;
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }

        .arrow-left,
        .arrow-right {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .prev-project .nav-link {
          justify-content: flex-start;
        }

        .next-project .nav-link {
          justify-content: flex-end;
        }

        .next-project .nav-project-content {
          text-align: right;
        }

        .nav-project-image {
          width: 100%;
          height: 50vh;
          overflow: hidden;
        }

        .nav-project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .nav-project-image a:hover img {
          transform: scale(1.05);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            padding: 4rem 2rem;
          }

          .project-title {
            font-size: 5rem;
          }

          .scroll-indicator {
            right: 2rem;
            bottom: 2rem;
          }

          .project-info,
          .project-gallery,
          .navigation-projects {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .navigation-projects {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .next-project .nav-project-content {
            text-align: left;
          }

          .next-project .nav-link {
            justify-content: flex-start;
          }

          .nav-link h2 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 0 1.5rem 3rem;
            align-items: flex-start;
            text-align: left;
            justify-content: flex-end;
          }

          .back-link {
            align-self: flex-start;
            margin-top: 1.5rem;
          }

          .project-title {
            font-size: 3rem;
            margin-bottom: 1rem;
            position: absolute;
            top: 35rem;
          }
          .project-meta {
            position: absolute;
            top: 42rem;
          }

          .location,
          .country {
            font-size: 1rem;
          }

          .scroll-indicator {
            position: absolute;
            right: 1.5rem;
            bottom: 3rem;
            font-size: 0.75rem;
          }

          .scroll-line {
            height: 30px;
          }

          .project-info {
            padding: 4rem 1.5rem;
          }

          .info-description h2 {
            font-size: 1.5rem;
          }

          .info-description p {
            font-size: 1rem;
          }

          .project-gallery {
            padding: 0 1.5rem 3rem;
            gap: 2rem;
          }

          .navigation-projects {
            padding: 3rem 1.5rem;
            gap: 3rem;
          }

          .nav-link {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .nav-link h2 {
            font-size: 1.5rem;
          }

          .arrow-left,
          .arrow-right {
            font-size: 2rem;
          }

          .nav-project-image {
            height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
