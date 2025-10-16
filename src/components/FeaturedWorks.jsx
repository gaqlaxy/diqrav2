import React, { useEffect } from "react";
import gsap from "gsap";
import "../styles/FeaturedWorks.css";

const FeaturedWorks = () => {
  useEffect(() => {
    // Slide-up effect for CTA button
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

    const styledCtaBtns = document.querySelectorAll(".cta-btn-styled");
    styledCtaBtns.forEach((btn) => {
      const timeline = createSlideUpEffect(btn);
      if (timeline) {
        btn.addEventListener("mouseenter", () => timeline.play());
        btn.addEventListener("mouseleave", () => timeline.reverse());
      }
    });
  }, []);

  const works = [
    {
      title: "MYRTLE POOL HOUSE",
      year: "2024",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=750&fit=crop",
    },
    {
      title: "COASTAL RESIDENCE",
      year: "2024",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=750&fit=crop",
    },
    {
      title: "URBAN PAVILION",
      year: "2023",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=750&fit=crop",
    },
    {
      title: "VALLEY VIEW HOUSE",
      year: "2023",
      img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=750&fit=crop",
    },
    {
      title: "GARDEN STUDIO",
      year: "2023",
      img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=750&fit=crop",
    },
    {
      title: "HILLSIDE RETREAT",
      year: "2022",
      img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=750&fit=crop",
    },
  ];

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2 className="section-title">
          FEATURED <br /> WORKS
        </h2>
        <span className="section-number">(06)</span>
      </div>

      <div className="works-grid">
        {works.map((work, index) => (
          <div className="work-item" key={index}>
            <div className="work-image">
              <img src={work.img} alt={work.title} />
              <div className="view-project-btn">
                <span>View Project</span>
              </div>
            </div>
            <div className="work-info">
              <div className="work-title">{work.title}</div>
              <div className="work-year">{work.year}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-btn-container">
        <a href="#" className="cta-btn-styled">
          <span>View all works</span>
        </a>
      </div>
    </section>
  );
};

export default FeaturedWorks;
