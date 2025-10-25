import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetailPage = ({ service = "exterior" }) => {
  const containerRef = useRef(null);

  // Service data
  const serviceData = {
    exterior: {
      title: "Exterior Design",
      subtitle: "TRANSFORM YOUR PROPERTY",
      hero: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
      description:
        "Elevate the curb appeal and functionality of your property with our exterior design services. We create stunning facades that blend aesthetics with durability.",
      features: [
        {
          title: "Facade Design",
          desc: "Contemporary and timeless exterior facades that make a lasting impression.",
        },
        {
          title: "Landscaping",
          desc: "Thoughtfully designed outdoor spaces that complement your architecture.",
        },
        {
          title: "Lighting Solutions",
          desc: "Strategic exterior lighting that enhances beauty and security.",
        },
        {
          title: "Material Selection",
          desc: "Premium, weather-resistant materials for long-lasting beauty.",
        },
      ],
      process: [
        {
          step: "01",
          title: "Site Analysis",
          desc: "Comprehensive evaluation of your property and surroundings.",
        },
        {
          step: "02",
          title: "Concept Design",
          desc: "Initial sketches and 3D visualizations of proposed designs.",
        },
        {
          step: "03",
          title: "Material Selection",
          desc: "Curated selection of materials and finishes.",
        },
        {
          step: "04",
          title: "Implementation",
          desc: "Expert execution with attention to every detail.",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
      ],
    },
    planning: {
      title: "Design & Planning",
      subtitle: "FROM VISION TO REALITY",
      hero: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
      description:
        "We'll transform your ideas into a cohesive plan that sets the stage for a seamless and successful execution. Our comprehensive approach ensures every detail is considered.",
      features: [
        {
          title: "Space Planning",
          desc: "Optimal utilization of space for functionality and flow.",
        },
        {
          title: "3D Visualization",
          desc: "Photorealistic renderings to preview your space before construction.",
        },
        {
          title: "Technical Drawings",
          desc: "Detailed architectural and engineering drawings.",
        },
        {
          title: "Budget Planning",
          desc: "Transparent cost estimation and financial planning.",
        },
      ],
      process: [
        {
          step: "01",
          title: "Discovery",
          desc: "Understanding your needs, preferences, and lifestyle.",
        },
        {
          step: "02",
          title: "Concept Development",
          desc: "Creating initial design concepts and mood boards.",
        },
        {
          step: "03",
          title: "Detailed Planning",
          desc: "Developing comprehensive plans and specifications.",
        },
        {
          step: "04",
          title: "Approval & Documentation",
          desc: "Final review and preparation for execution.",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
      ],
    },
    consultation: {
      title: "Consultation",
      subtitle: "EXPERT GUIDANCE",
      hero: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
      description:
        "Our consultation services offer personalized guidance & expertise to help you navigate the complexities of architectural and design decisions.",
      features: [
        {
          title: "Project Assessment",
          desc: "Comprehensive evaluation of your project requirements and constraints.",
        },
        {
          title: "Design Direction",
          desc: "Expert advice on style, materials, and spatial planning.",
        },
        {
          title: "Feasibility Study",
          desc: "Analysis of project viability and potential challenges.",
        },
        {
          title: "Contractor Coordination",
          desc: "Guidance on selecting and working with contractors.",
        },
      ],
      process: [
        {
          step: "01",
          title: "Initial Meeting",
          desc: "One-on-one discussion to understand your vision.",
        },
        {
          step: "02",
          title: "Site Visit",
          desc: "On-site assessment and documentation.",
        },
        {
          step: "03",
          title: "Recommendations",
          desc: "Detailed report with actionable insights.",
        },
        {
          step: "04",
          title: "Follow-up Support",
          desc: "Ongoing guidance throughout your project.",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
      ],
    },
    interior: {
      title: "Interior Design",
      subtitle: "SPACES THAT INSPIRE",
      hero: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
      description:
        "Create stunning interiors that reflect your style and enhance functionality with our expert design solutions. Every space tells a unique story.",
      features: [
        {
          title: "Custom Furniture",
          desc: "Bespoke furniture pieces tailored to your space and style.",
        },
        {
          title: "Color Consultation",
          desc: "Expert color palettes that create the perfect ambiance.",
        },
        {
          title: "Space Optimization",
          desc: "Intelligent layouts that maximize comfort and efficiency.",
        },
        {
          title: "Styling & Decor",
          desc: "Curated selection of accessories and finishing touches.",
        },
      ],
      process: [
        {
          step: "01",
          title: "Style Discovery",
          desc: "Identifying your aesthetic preferences and lifestyle needs.",
        },
        {
          step: "02",
          title: "Design Concept",
          desc: "Developing mood boards and material palettes.",
        },
        {
          step: "03",
          title: "Space Planning",
          desc: "Creating functional layouts and furniture arrangements.",
        },
        {
          step: "04",
          title: "Installation",
          desc: "Bringing the design to life with precision.",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
      ],
    },
    renovation: {
      title: "Renovation",
      subtitle: "REFRESH & REVITALIZE",
      hero: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
      description:
        "Transform your existing space with our renovation services that breathe new life into outdated structures. Seamless upgrades with minimal disruption.",
      features: [
        {
          title: "Structural Updates",
          desc: "Safe and compliant structural modifications and improvements.",
        },
        {
          title: "Modern Systems",
          desc: "Upgrading electrical, plumbing, and HVAC systems.",
        },
        {
          title: "Aesthetic Refresh",
          desc: "Contemporary finishes and fixtures for a modern look.",
        },
        {
          title: "Space Reconfiguration",
          desc: "Reimagining layouts for better flow and functionality.",
        },
      ],
      process: [
        {
          step: "01",
          title: "Assessment",
          desc: "Thorough inspection of existing conditions and potential.",
        },
        {
          step: "02",
          title: "Design Solutions",
          desc: "Creative approaches to maximize your spaces potential.",
        },
        {
          step: "03",
          title: "Phased Execution",
          desc: "Strategic implementation to minimize disruption.",
        },
        {
          step: "04",
          title: "Quality Assurance",
          desc: "Meticulous attention to finish quality and details.",
        },
      ],
      gallery: [
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
        "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
      ],
    },
  };

  const currentService = serviceData[service];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image reveal animation
      gsap.from(".servicedetail-hero-image", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".servicedetail-hero",
          start: "top 80%",
        },
      });

      // Features cards stagger
      gsap.from(".servicedetail-feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".servicedetail-features",
          start: "top 70%",
        },
      });

      // Process steps animation
      gsap.from(".servicedetail-process-step", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".servicedetail-process",
          start: "top 70%",
        },
      });

      // Gallery images parallax
      gsap.utils.toArray(".servicedetail-gallery-image").forEach((img) => {
        gsap.to(img, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  return (
    <div ref={containerRef} className="servicedetail-container">
      {/* Hero Section */}
      <section className="servicedetail-hero">
        <div className="servicedetail-hero-content">
          <div className="servicedetail-label">{currentService.subtitle}</div>
          <h1 className="servicedetail-hero-title">{currentService.title}</h1>
          <p className="servicedetail-hero-desc">
            {currentService.description}
          </p>
        </div>
        <div className="servicedetail-hero-image-wrapper">
          <img
            src={currentService.hero}
            alt={currentService.title}
            className="servicedetail-hero-image"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="servicedetail-features">
        <div className="servicedetail-section-header">
          <div className="servicedetail-label">WHAT WE OFFER</div>
          <h2 className="servicedetail-section-title">Key Features</h2>
        </div>
        <div className="servicedetail-features-grid">
          {currentService.features.map((feature, index) => (
            <div key={index} className="servicedetail-feature-card">
              <div className="servicedetail-feature-number">0{index + 1}</div>
              <h3 className="servicedetail-feature-title">{feature.title}</h3>
              <p className="servicedetail-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="servicedetail-process">
        <div className="servicedetail-section-header">
          <div className="servicedetail-label">OUR APPROACH</div>
          <h2 className="servicedetail-section-title">How We Work</h2>
        </div>
        <div className="servicedetail-process-steps">
          {currentService.process.map((step, index) => (
            <div key={index} className="servicedetail-process-step">
              <div className="servicedetail-step-number">{step.step}</div>
              <div className="servicedetail-step-content">
                <h3 className="servicedetail-step-title">{step.title}</h3>
                <p className="servicedetail-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="servicedetail-gallery">
        <div className="servicedetail-section-header">
          <div className="servicedetail-label">PORTFOLIO</div>
          <h2 className="servicedetail-section-title">Our Work</h2>
        </div>
        <div className="servicedetail-gallery-grid">
          {currentService.gallery.map((image, index) => (
            <div key={index} className="servicedetail-gallery-item">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="servicedetail-gallery-image"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="servicedetail-cta">
        <h2 className="servicedetail-cta-title">
          Ready to Start Your Project?
        </h2>
        <p className="servicedetail-cta-desc">
          Let's discuss how we can bring your vision to life.
        </p>
        <a href="#contact" className="servicedetail-cta-button">
          <span>Get in Touch</span>
        </a>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .servicedetail-container {
          font-family: 'Outfit', sans-serif;
          color: #121212;
          background-color: #fff;
        }

        /* Hero Section */
        .servicedetail-hero {
          max-width: 1440px;
          margin: 0 auto;
          padding: 120px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .servicedetail-hero-content {
          max-width: 600px;
        }

        .servicedetail-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #666;
          margin-bottom: 16px;
        }

        .servicedetail-label::before {
          content: "";
          width: 8px;
          height: 8px;
          background-color: #000;
          flex-shrink: 0;
        }

        .servicedetail-hero-title {
          font-size: 72px;
          font-weight: 400;
          letter-spacing: -2px;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .servicedetail-hero-desc {
          font-size: 18px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .servicedetail-hero-image-wrapper {
          height: 600px;
          border-radius: 16px;
          overflow: hidden;
        }

        .servicedetail-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Section Header */
        .servicedetail-section-header {
          max-width: 1440px;
          margin: 0 auto 60px;
          padding: 0 40px;
        }

        .servicedetail-section-title {
          font-size: 48px;
          font-weight: 400;
          letter-spacing: -1.5px;
          line-height: 1.2;
          margin: 8px 0 0;
        }

        /* Features Section */
        .servicedetail-features {
          max-width: 1440px;
          margin: 120px auto;
          padding: 0 40px;
        }

        .servicedetail-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .servicedetail-feature-card {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 40px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .servicedetail-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .servicedetail-feature-number {
          font-size: 14px;
          font-weight: 600;
          color: #999;
          margin-bottom: 16px;
        }

        .servicedetail-feature-title {
          font-size: 24px;
          font-weight: 500;
          margin: 0 0 12px;
        }

        .servicedetail-feature-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        /* Process Section */
        .servicedetail-process {
          max-width: 1440px;
          margin: 120px auto;
          padding: 0 40px;
        }

        .servicedetail-process-steps {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .servicedetail-process-step {
          display: flex;
          gap: 32px;
          padding: 40px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          transition: border-color 0.3s ease;
        }

        .servicedetail-process-step:hover {
          border-color: #000;
        }

        .servicedetail-step-number {
          font-size: 48px;
          font-weight: 700;
          color: #e5e5e5;
          line-height: 1;
          flex-shrink: 0;
        }

        .servicedetail-step-content {
          flex: 1;
        }

        .servicedetail-step-title {
          font-size: 28px;
          font-weight: 500;
          margin: 0 0 12px;
        }

        .servicedetail-step-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        /* Gallery Section */
        .servicedetail-gallery {
          max-width: 1440px;
          margin: 120px auto;
          padding: 0 40px;
        }

        .servicedetail-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .servicedetail-gallery-item {
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
        }

        .servicedetail-gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .servicedetail-gallery-item:hover .servicedetail-gallery-image {
          transform: scale(1.05);
        }

        /* CTA Section */
        .servicedetail-cta {
          max-width: 1440px;
          margin: 120px auto;
          padding: 80px 40px;
          text-align: center;
          background: #f9f9f9;
          border-radius: 16px;
        }

        .servicedetail-cta-title {
          font-size: 48px;
          font-weight: 400;
          letter-spacing: -1.5px;
          margin: 0 0 16px;
        }

        .servicedetail-cta-desc {
          font-size: 18px;
          color: #666;
          margin: 0 0 32px;
        }

        .servicedetail-cta-button {
          display: inline-flex;
          align-items: center;
          text-transform: uppercase;
          padding: 16px 32px;
          background: #080807;
          border-radius: 50px;
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .servicedetail-cta-button::after {
          content: "";
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          margin-left: 12px;
          transition: all 0.3s ease;
        }

        .servicedetail-cta-button:hover {
          background: #000;
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .servicedetail-hero {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 80px 40px 60px;
          }

          .servicedetail-hero-title {
            font-size: 56px;
          }

          .servicedetail-features-grid {
            grid-template-columns: 1fr;
          }

          .servicedetail-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .servicedetail-hero {
            padding: 60px 20px 40px;
          }

          .servicedetail-hero-title {
            font-size: 42px;
          }

          .servicedetail-hero-image-wrapper {
            height: 400px;
          }

          .servicedetail-section-title {
            font-size: 36px;
          }

          .servicedetail-features,
          .servicedetail-process,
          .servicedetail-gallery,
          .servicedetail-cta {
            margin: 80px auto;
            padding: 0 20px;
          }

          .servicedetail-feature-card {
            padding: 32px 24px;
          }

          .servicedetail-process-step {
            flex-direction: column;
            padding: 32px 24px;
            gap: 16px;
          }

          .servicedetail-step-number {
            font-size: 36px;
          }

          .servicedetail-step-title {
            font-size: 24px;
          }

          .servicedetail-gallery-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .servicedetail-gallery-item {
            height: 300px;
          }

          .servicedetail-cta {
            padding: 60px 20px;
          }

          .servicedetail-cta-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetailPage;
