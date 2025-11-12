import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import projectsData from "../data/projects-data.json";
import Footer from "../components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);

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

  if (!project) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="project-detail">
      {/* Hero Section */}
      <section className="project-hero">
        <div className="hero-content">
          <Link to="/works" className="back-link">
            ← Back to Works
          </Link>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.location}</span>
          </div>
        </div>
        <div className="hero-image">
          <img src={project.images[0]} alt={project.title} />
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

        /* Hero Section */
        .project-hero {
          padding: 6rem 5rem 4rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .hero-content {
          margin-bottom: 3rem;
          margin-top: 3rem;
        }

        .back-link {
          display: inline-block;
          text-decoration: none;
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 2rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #000;
        }

        .project-title {
          font-size: 5rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem 0;
          line-height: 1.1;
        }

        .project-meta {
          display: flex;
          gap: 1rem;
          font-size: 1.1rem;
          color: #666;
        }

        .hero-image {
          width: 100%;

          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Project Info */
        .project-info {
          padding: 6rem 5rem;
          max-width: 1600px;
          margin: 0 auto;
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
          .project-hero,
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

          .project-title {
            font-size: 3.5rem;
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
          .project-hero {
            padding: 4rem 1.5rem 2rem;
          }

          .project-title {
            font-size: 2.5rem;
          }

          .project-meta {
            flex-direction: column;
            gap: 0.5rem;
          }

          .hero-image {
            height: 50vh;
          }

          .project-info {
            padding: 3rem 1.5rem;
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
