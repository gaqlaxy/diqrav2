// import React, { useState, useEffect, useRef } from "react";

// const projects = [
//   {
//     id: 1,
//     title: "JALOURA MAIN HOUSE",
//     image:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
//   },
//   {
//     id: 2,
//     title: "JALOURA GUEST HOUSE",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
//   },
//   {
//     id: 3,
//     title: "MYRTLE POOL HOUSE",
//     image:
//       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
//   },
//   {
//     id: 4,
//     title: "CLIFTON",
//     image:
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
//   },
//   {
//     id: 5,
//     title: "SIDNEY HOUSE",
//     image:
//       "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
//   },
//   {
//     id: 6,
//     title: "HAIG",
//     image:
//       "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
//   },
//   {
//     id: 7,
//     title: "MOWBRAY",
//     image:
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
//   },
//   {
//     id: 8,
//     title: "WARRABA 1",
//     image:
//       "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
//   },
// ];

// export default function HorizontalGallery() {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container || isMobile) return;

//     const handleWheel = (e) => {
//       e.preventDefault();
//       container.scrollLeft += e.deltaY;
//     };

//     const handleScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       const scrollWidth = container.scrollWidth - container.clientWidth;
//       const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
//       setScrollProgress(progress);
//     };

//     container.addEventListener("wheel", handleWheel, { passive: false });
//     container.addEventListener("scroll", handleScroll);

//     return () => {
//       container.removeEventListener("wheel", handleWheel);
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [isMobile]);

//   return (
//     <div className="gallery-container">
//       {/* Mobile Header */}
//       {isMobile && (
//         <div className="mobile-header">
//           <h1 className="mobile-title">WORKS</h1>
//           <div className="mobile-links">
//             <a href="#">IN PROGRESS →</a>
//             <a href="#">ARCHIVE →</a>
//           </div>
//         </div>
//       )}

//       {/* Main Content Container */}
//       <div
//         ref={scrollContainerRef}
//         className={
//           isMobile ? "scroll-container-mobile" : "scroll-container-desktop"
//         }
//       >
//         {/* Projects Grid */}
//         <div
//           className={
//             isMobile ? "projects-grid-mobile" : "projects-grid-desktop"
//           }
//         >
//           {projects.map((project, idx) => (
//             <div
//               key={project.id}
//               className={`project-card ${idx % 2 === 0 ? "tall" : "wide"}`}
//             >
//               <div className="project-inner">
//                 <img src={project.image} alt={project.title} />
//                 <div className="overlay" />
//                 <div className="project-title-container">
//                   <h3>{project.title}</h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Desktop: Fixed Text Elements */}
//       {!isMobile && (
//         <>
//           <div className="works-title">
//             <h1>WORKS</h1>
//           </div>
//           <div className="desktop-links">
//             <a href="#">IN PROGRESS →</a>
//             <a href="#">ARCHIVE →</a>
//           </div>
//         </>
//       )}

//       {/* Desktop: Scroll Indicator */}
//       {!isMobile && (
//         <div className="scroll-indicator">
//           <span className="scroll-text">SCROLL DOWN TO EXPLORE</span>
//           <div className="progress-bar">
//             <div
//               className="progress-fill"
//               style={{ width: `${scrollProgress}%` }}
//             />
//           </div>
//           <span className="progress-percent">
//             ({Math.round(scrollProgress)}%)
//           </span>
//         </div>
//       )}

//       <style jsx>{`
//         .gallery-container {
//           width: 100%;
//           height: 100vh;
//           background: white;
//           overflow: hidden;
//           position: relative;
//         }

//         /* Mobile Styles */
//         .mobile-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1.5rem;
//         }

//         .mobile-title {
//           font-size: 3.75rem;
//           font-weight: bold;
//           letter-spacing: -0.02em;
//         }

//         .mobile-links {
//           display: flex;
//           flex-direction: column;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         /* Desktop Scroll Container */
//         .scroll-container-desktop {
//           display: flex;
//           align-items: center;
//           overflow-x: auto;
//           overflow-y: hidden;
//           height: 100%;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .scroll-container-desktop::-webkit-scrollbar {
//           display: none;
//         }

//         .scroll-container-mobile {
//           overflow-y: auto;
//           height: 100%;
//           padding: 0 1.5rem 1.5rem;
//         }

//         /* Projects Grid */
//         .projects-grid-desktop {
//           display: flex;
//           align-items: end;
//           gap: 1.5rem;
//           padding: 0 5rem;
//         }

//         .projects-grid-mobile {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2rem;
//         }

//         /* Project Cards */
//         .project-card {
//           flex-shrink: 0;
//           cursor: pointer;
//         }

//         .project-card.tall {
//           width: 320px;
//           height: 384px;
//         }

//         .project-card.wide {
//           width: 384px;
//           height: 320px;
//         }

//         @media (max-width: 768px) {
//           .project-card.tall,
//           .project-card.wide {
//             width: 100%;
//             height: 256px;
//           }
//         }

//         .project-inner {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }

//         .project-inner img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }

//         .project-card:hover img {
//           transform: scale(1.1);
//         }

//         .overlay {
//           position: absolute;
//           inset: 0;
//           background: rgba(0, 0, 0, 0);
//           transition: background 0.3s ease;
//         }

//         .project-card:hover .overlay {
//           background: rgba(0, 0, 0, 0.2);
//         }

//         .project-title-container {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           padding: 1.5rem;
//           background: linear-gradient(
//             to top,
//             rgba(0, 0, 0, 0.8),
//             rgba(0, 0, 0, 0.4),
//             transparent
//           );
//         }

//         .project-title-container h3 {
//           color: white;
//           font-weight: 600;
//           font-size: 0.875rem;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           margin: 0;
//         }

//         /* Fixed Desktop Elements */
//         .works-title {
//           position: fixed;
//           bottom: 3rem;
//           left: 4rem;
//         }

//         .works-title h1 {
//           font-size: 6rem;
//           font-weight: bold;
//           letter-spacing: -0.02em;
//           margin: 0;
//         }

//         .desktop-links {
//           position: fixed;
//           bottom: 3rem;
//           right: 4rem;
//           display: flex;
//           gap: 2rem;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .desktop-links a {
//           text-decoration: none;
//           color: black;
//           letter-spacing: 0.05em;
//         }

//         .desktop-links a:hover {
//           text-decoration: underline;
//         }

//         /* Scroll Indicator */
//         .scroll-indicator {
//           position: fixed;
//           bottom: 3rem;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//           background: rgba(255, 255, 255, 0.9);
//           backdrop-filter: blur(8px);
//           padding: 0.75rem 1.5rem;
//           border-radius: 9999px;
//         }

//         .scroll-text {
//           font-size: 0.75rem;
//           font-weight: 600;
//           letter-spacing: 0.1em;
//         }

//         .progress-bar {
//           width: 160px;
//           height: 4px;
//           background: #d1d5db;
//           border-radius: 9999px;
//           overflow: hidden;
//         }

//         .progress-fill {
//           height: 100%;
//           background: black;
//           transition: width 0.2s ease-out;
//         }

//         .progress-percent {
//           font-size: 0.75rem;
//           font-weight: 600;
//           font-variant-numeric: tabular-nums;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "JALOURA MAIN HOUSE",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "JALOURA GUEST HOUSE",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "MYRTLE POOL HOUSE",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "CLIFTON",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "SIDNEY HOUSE",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "HAIG",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "MOWBRAY",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "WARRABA 1",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  },
];

export default function HorizontalGallery() {
  const [scrollProgress, setScrollProgress] = useState(0);
  //   const [isMobile, setIsMobile] = useState(false);
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

  console.log("isMobile:", isMobile);

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
            <div
              key={project.id}
              className={`project-card ${idx % 2 === 0 ? "tall" : "wide"}`}
            >
              <div className="project-inner">
                <img src={project.image} alt={project.title} />
                <div className="overlay" />
                <div className="project-title-container">
                  <h3>{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Fixed Text Elements */}

      {/* {!isMobile && (
        <>
          <div className="works-title">
            <h1>WORKS</h1>
          </div>
          <div className="desktop-links">
            <a href="#">IN PROGRESS →</a>
            <a href="#">ARCHIVE →</a>
          </div>
        </>
      )}

      
      {!isMobile && (
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
      )} */}

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
          color: #000; /* make sure text is visible */
          gap: 2rem;
          background: transparent; /* no white overlay */
        }

        .works-title h1 {
          font-size: 120px;
          font-weight: 400;
          letter-spacing: -0.03em;
          margin: 0;
          color: #000; /* visible on white background */
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
