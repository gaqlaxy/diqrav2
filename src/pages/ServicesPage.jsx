import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import SlideUpButton from "../components/SlideUpButton";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state immediately to show content
    setIsLoaded(true);

    // Delay GSAP initialization slightly to allow page to render
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Set z-index for images
        const imgWrappers = gsap.utils.toArray(".servicespage-img-wrapper");
        imgWrappers.forEach((element) => {
          const order = element.getAttribute("data-index");
          if (order !== null) {
            element.style.zIndex = order;
          }
        });

        // Mobile layout handler
        const handleMobileLayout = () => {
          const isMobile = window.matchMedia("(max-width: 768px)").matches;
          const leftItems = gsap.utils.toArray(".servicespage-arch__info");
          const rightItems = gsap.utils.toArray(".servicespage-img-wrapper");

          if (isMobile) {
            leftItems.forEach((item, i) => {
              item.style.order = i * 2;
            });
            rightItems.forEach((item, i) => {
              item.style.order = i * 2 + 1;
            });
          } else {
            leftItems.forEach((item) => {
              item.style.order = "";
            });
            rightItems.forEach((item) => {
              item.style.order = "";
            });
          }
        };

        handleMobileLayout();

        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(handleMobileLayout, 100);
        };

        window.addEventListener("resize", handleResize);

        const imgs = gsap.utils.toArray(".servicespage-img-wrapper img");

        // Only initialize scroll animations on desktop
        const mediaQuery = window.matchMedia("(min-width: 769px)");

        if (mediaQuery.matches) {
          // Desktop animations
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".servicespage-arch",
              start: "top top",
              end: "bottom bottom",
              pin: ".servicespage-arch__right",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(imgs, {
            clipPath: "inset(0)",
            objectPosition: "0px 0%",
          });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

            if (nextImage) {
              const sectionTimeline = gsap.timeline();
              sectionTimeline
                .to(
                  currentImage,
                  {
                    clipPath: "inset(0px 0px 100%)",
                    objectPosition: "0px 60%",
                    // opacity: 0,
                    // scale: 1.1,
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                )
                .to(
                  nextImage,
                  {
                    objectPosition: "0px 40%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                );
              mainTimeline.add(sectionTimeline);
            }
          });
          // } else {
          //   // Mobile animations - simplified
          //   gsap.set(imgs, {
          //     objectPosition: "0px 60%",
          //   });

          //   imgs.forEach((image) => {
          //     gsap
          //       .timeline({
          //         scrollTrigger: {
          //           trigger: image,
          //           start: "top-=70% top+=50%",
          //           end: "bottom+=200% bottom",
          //           scrub: 1,
          //           invalidateOnRefresh: true,
          //         },
          //       })
          //       .to(image, {
          //         objectPosition: "0px 30%",
          //         duration: 5,
          //         ease: "none",
          //       });
          //   });
          // }
        } else {
          // ✅ Mobile animations - smoother parallax without white gaps
          gsap.set(imgs, { yPercent: 0 });

          imgs.forEach((image) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: image,
                  start: "top bottom", // starts when image enters viewport
                  end: "bottom top", // ends when it leaves
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              })
              .to(image, {
                yPercent: -15, // gentle upward motion
                ease: "none",
              });
          });
        }

        // Button hover effects - simplified initialization
        const initButtonEffects = () => {
          const styledCtaBtns = document.querySelectorAll(
            ".servicespage-cta-btn-styled"
          );

          styledCtaBtns.forEach((btn) => {
            if (btn.hasAttribute("data-hover-initialized")) return;

            btn.addEventListener("mouseenter", () => {
              gsap.to(btn.querySelector("span"), {
                y: -5,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            btn.addEventListener("mouseleave", () => {
              gsap.to(btn.querySelector("span"), {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            btn.setAttribute("data-hover-initialized", "true");
          });
        };

        initButtonEffects();

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, containerRef);

      return () => ctx.revert();
    }, 50); // Small delay to let page render first

    return () => clearTimeout(initTimeout);
  }, []);

  if (!isLoaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="servicespage-container">
      <div className="servicespage-spacer"></div>

      <div className="servicespage-header-section">
        <div className="servicespage-label">
          <span>(WHAT WE DO)</span>
        </div>
        <h1 className="servicespage-main-title">Our Services</h1>
      </div>

      <div className="servicespage-arch">
        <div className="servicespage-arch__left">
          <div
            className="servicespage-arch__info"
            id="servicespage-exterior-design"
          >
            <div className="servicespage-content">
              <div className="servicespage-icon-container">
                <svg
                  className="servicespage-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                >
                  <rect x="20" y="40" width="25" height="35" />
                  <rect x="25" y="48" width="6" height="8" />
                  <rect x="34" y="48" width="6" height="8" />
                  <rect x="25" y="60" width="6" height="8" />
                  <rect x="34" y="60" width="6" height="8" />
                  <path d="M 45 30 L 55 20 L 75 20 L 75 75 L 45 75 Z" />
                  <rect x="50" y="28" width="6" height="8" />
                  <rect x="59" y="28" width="6" height="8" />
                  <rect x="50" y="40" width="6" height="8" />
                  <rect x="59" y="40" width="6" height="8" />
                  <rect x="50" y="52" width="6" height="8" />
                  <rect x="59" y="52" width="6" height="8" />
                  <line x1="55" y1="20" x2="55" y2="30" />
                  <line x1="55" y1="30" x2="45" y2="30" />
                </svg>
              </div>
              <h2 className="servicespage-header">Exterior Design</h2>
              <p className="servicespage-desc">
                Elevate the curb appeal and functionality of your property with
                our exterior design services.
              </p>
              {/* <Link
                to="/services/exterior-design"
                className="servicespage-cta-btn-styled"
              >
                <span>Learn More</span>
              </Link> */}
              <SlideUpButton to="/services/exterior-design">
                Learn More
              </SlideUpButton>
            </div>
          </div>

          <div
            className="servicespage-arch__info"
            id="servicespage-design-planning"
          >
            <div className="servicespage-content">
              <div className="servicespage-icon-container">
                <svg
                  className="servicespage-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                >
                  <circle cx="35" cy="45" r="18" />
                  <circle cx="55" cy="35" r="18" />
                  <circle cx="50" cy="60" r="18" />
                </svg>
              </div>
              <h2 className="servicespage-header">Design & Planning</h2>
              <p className="servicespage-desc">
                We'll transform your ideas into a cohesive plan that sets the
                stage for a seamless and successful execution.
              </p>
              {/* <Link
                to="/services/design-planning"
                className="servicespage-cta-btn-styled"
              >
                <span>Learn More</span>
              </Link> */}
              <SlideUpButton to="/services/design-planning">
                Learn More
              </SlideUpButton>
            </div>
          </div>

          <div
            className="servicespage-arch__info"
            id="servicespage-consultation"
          >
            <div className="servicespage-content">
              <div className="servicespage-icon-container">
                <svg
                  className="servicespage-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                >
                  <path d="M 25 45 L 50 25 L 75 45 L 75 75 L 25 75 Z" />
                  <rect x="45" y="55" width="10" height="20" />
                  <path d="M 20 45 L 80 45" />
                  <rect x="55" y="35" width="12" height="10" rx="1" />
                  <line x1="58" y1="38" x2="64" y2="38" />
                  <line x1="58" y1="41" x2="64" y2="41" />
                  <path
                    d="M 72 28 L 78 28 L 78 22 L 88 22 L 88 32 L 82 32 L 82 34"
                    strokeWidth="1.2"
                  />
                  <line x1="75" y1="25" x2="78" y2="25" strokeWidth="1.2" />
                  <line x1="85" y1="25" x2="88" y2="25" strokeWidth="1.2" />
                  <line x1="85" y1="29" x2="88" y2="29" strokeWidth="1.2" />
                </svg>
              </div>
              <h2 className="servicespage-header">Consultation</h2>
              <p className="servicespage-desc">
                Our consultation services offer personalized guidance &
                expertise to help you navigate the complexities.
              </p>
              {/* <Link
                to="/services/consultation"
                className="servicespage-cta-btn-styled"
              >
                <span>Learn More</span>
              </Link> */}
              <SlideUpButton to="/services/consultaion">
                Learn More
              </SlideUpButton>
            </div>
          </div>

          <div
            className="servicespage-arch__info"
            id="servicespage-interior-design"
          >
            <div className="servicespage-content">
              <div className="servicespage-icon-container">
                <svg
                  className="servicespage-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                >
                  <rect x="20" y="35" width="60" height="40" />
                  <line x1="50" y1="35" x2="50" y2="75" />
                  <line x1="20" y1="55" x2="80" y2="55" />
                  <rect x="25" y="40" width="8" height="10" />
                  <rect x="57" y="40" width="8" height="10" />
                  <path d="M 35 60 L 45 70 L 45 75" />
                  <circle cx="60" cy="67" r="5" />
                </svg>
              </div>
              <h2 className="servicespage-header">Interior Design</h2>
              <p className="servicespage-desc">
                Create stunning interiors that reflect your style and enhance
                functionality with our expert design solutions.
              </p>
              {/* <Link
                to="/services/interior-design"
                className="servicespage-cta-btn-styled"
              >
                <span>Learn More</span>
              </Link> */}
              <SlideUpButton to="/services/interior-design">
                Learn More
              </SlideUpButton>
            </div>
          </div>

          <div className="servicespage-arch__info" id="servicespage-renovation">
            <div className="servicespage-content">
              <div className="servicespage-icon-container">
                <svg
                  className="servicespage-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                >
                  <path d="M 30 70 L 30 40 L 50 25 L 70 40 L 70 70 Z" />
                  <rect x="42" y="55" width="16" height="15" />
                  <path d="M 25 70 L 75 70" strokeWidth="2" />
                  <line x1="40" y1="40" x2="40" y2="50" strokeWidth="2" />
                  <line x1="60" y1="40" x2="60" y2="50" strokeWidth="2" />
                  <circle cx="65" cy="30" r="8" />
                  <path d="M 61 30 L 63 32 L 69 26" strokeWidth="1.2" />
                </svg>
              </div>
              <h2 className="servicespage-header">Renovation</h2>
              <p className="servicespage-desc">
                Transform your existing space with our renovation services that
                breathe new life into outdated structures.
              </p>
              {/* <Link
                to="/services/renovation"
                className="servicespage-cta-btn-styled"
              >
                <span>Learn More</span>
              </Link> */}
              <SlideUpButton to="/services/renovation">
                Learn More
              </SlideUpButton>
            </div>
          </div>
        </div>

        <div className="servicespage-arch__right">
          <div className="servicespage-img-wrapper" data-index="5">
            <img
              src="https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp"
              alt="Exterior Design"
              loading="lazy"
            />
          </div>

          <div className="servicespage-img-wrapper" data-index="4">
            <img
              src="https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp"
              alt="Design & Planning"
              loading="lazy"
            />
          </div>

          <div className="servicespage-img-wrapper" data-index="3">
            <img
              src="https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp"
              alt="Consultation"
              loading="lazy"
            />
          </div>

          <div className="servicespage-img-wrapper" data-index="2">
            <img
              src="https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp"
              alt="Interior Design"
              loading="lazy"
            />
          </div>

          <div className="servicespage-img-wrapper" data-index="1">
            <img
              src="https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp"
              alt="Renovation"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* <div className="servicespage-spacer"></div> */}
      <CtaSection />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&display=swap');
        
        
        
        .servicespage-container {
          max-width: 1600px;
          
          margin: 0 auto;
        }
        
        .servicespage-spacer {
          width: 100%;
          height: 30vh;
        }

        .servicespage-header-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 60px;
          max-width: 1400px;
          margin-inline: auto;
        }

        .servicespage-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
  
  z-index: 101;
  font-weight: 400;
  color: #333;
        }

        

        .servicespage-main-title {
          font-size: 120px;
          font-weight: 400;
          letter-spacing: -3px;
          line-height: 0.9;
          margin: 0;
        }
        
        .servicespage-arch {
          display: flex;
          gap: 60px;
          justify-content: space-between;
          max-width: 1100px;
          margin-inline: auto;
        }
        
        .servicespage-arch__left {
          display: flex;
          flex-direction: column;
          min-width: 300px;
        }
        
        .servicespage-arch__info {
          max-width: 385px;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .servicespage-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .servicespage-icon-container {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          
        }

        .servicespage-icon {
          width: 60px;
          height: 60px;
        }
        
        .servicespage-header {
          
          font-size: 52px;
          font-weight: 400;
          letter-spacing: -0.64px;
          margin: 0 0 12px 0;
        }
        
        .servicespage-desc {
          color: rgba(18, 18, 18, 0.8);
          font-size: 15px;
          letter-spacing: -0.45px;
          margin: 0 0 28px 0;
          line-height: 1.6;
        }
        
        .servicespage-cta-btn-styled {
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

        .servicespage-cta-btn-styled span {
          color: #fff;
          display: block;
          position: relative;
          transition: transform 0.3s ease;
        }

        .servicespage-cta-btn-styled::after {
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

        .servicespage-cta-btn-styled:hover::after {
          background: #fff;
          border-color: #fff;
        }
        
        .servicespage-arch__right {
          flex-shrink: 1;
          height: 100vh;
          width: 100%;
          max-width: 540px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .servicespage-img-wrapper {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 400px;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .servicespage-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        @media (max-width: 900px) {
          .servicespage-arch {
            gap: 30px;
          }
        }
        
        @media (max-width: 768px) {
          .servicespage-main-title {
            font-size: clamp(2.5rem, 1.813rem + 5.84vw, 9.229rem);
            letter-spacing: -1px;
            font-weight: 700;
            line-height: 0.9;
          }

          .servicespage-header-section {
            margin-bottom: 40px;
          }

          .servicespage-arch {
            flex-direction: column;
            gap: 20px;
          }
          
          .servicespage-arch__left,
          .servicespage-arch__right {
            display: contents;
          }
          
          .servicespage-arch__right {
            height: auto;
            max-width: 100%;
          }
          
          .servicespage-img-wrapper {
            position: static;
            transform: none;
            height: 360px;
            width: 100%;
            margin-bottom: 20px;
          }
          
          .servicespage-arch__info {
            height: auto;
            padding: 20px 0;
          }

          .servicespage-header {
            font-size: 28px;
          }
        }
        
        @media (max-width: 560px) {
          .servicespage-arch {
            gap: 12px;
          }
          
          .servicespage-container {
            padding: 10px;
          }
          
          .servicespage-img-wrapper {
            border-radius: 10px;
            height: 280px;
          }

          .servicespage-header {
            font-size: 24px;
          }

          .servicespage-desc {
            font-size: 14px;
          }

          .servicespage-cta-btn-styled {
            font-size: 14px;
            padding: 8px 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
