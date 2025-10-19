// import React, { useEffect } from "react";
// import gsap from "gsap";

// export default function CTASection() {
//   useEffect(() => {
//     const createSlideUpEffect = (element) => {
//       let span = element.querySelector("span");

//       if (!span) {
//         const originalText = element.textContent;
//         element.innerHTML = `<span>${originalText}</span>`;
//         span = element.querySelector("span");
//       }

//       if (span.querySelector(".text-original")) return;

//       const originalText = span.textContent;
//       span.innerHTML = `
//         <span class="text-original">${originalText}</span>
//         <span class="text-hover">${originalText}</span>
//       `;

//       const originalSpan = span.querySelector(".text-original");
//       const hoverSpan = span.querySelector(".text-hover");

//       gsap.set(span, {
//         overflow: "hidden",
//         height: "auto",
//         position: "relative",
//         display: "block",
//       });

//       gsap.set(originalSpan, {
//         y: 0,
//         position: "relative",
//         display: "block",
//       });
//       gsap.set(hoverSpan, {
//         y: "100%",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//       });

//       const tl = gsap.timeline({ paused: true });
//       tl.to(originalSpan, {
//         y: "-100%",
//         duration: 0.3,
//         ease: "power2.out",
//       }).to(hoverSpan, { y: 0, duration: 0.3, ease: "power2.out" }, 0);

//       return tl;
//     };

//     const styledCtaBtns = document.querySelectorAll(".cta-btn-styled");
//     styledCtaBtns.forEach((btn) => {
//       const timeline = createSlideUpEffect(btn);
//       if (timeline) {
//         btn.addEventListener("mouseenter", () => timeline.play());
//         btn.addEventListener("mouseleave", () => timeline.reverse());
//       }
//     });
//   }, []);

//   return (
//     <>
//       <section className="cta-btn">
//         <div className="cta-section">
//           <div className="cta-heading">
//             <span className="desktop-text">FOCUSED ON QUALITY</span>
//             <span className="mobile-text">
//               FOCUSED ON
//               <br />
//               QUALITY
//             </span>
//           </div>
//           <div className="cta-heading2">
//             <span className="desktop-text">DRIVEN BY CREATIVITY</span>
//             <span className="mobile-text">
//               DRIVEN BY
//               <br />
//               CREATIVITY
//             </span>
//           </div>
//         </div>
//         <div className="cta-btn-section">
//           <a href="#" className="cta-btn-styled">
//             <span>tell us about your project</span>
//           </a>
//         </div>
//       </section>

//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           background-color: #fff;
//         }

//         .cta-section {
//           display: grid;
//           align-items: center;
//           justify-content: center;
//           grid-template-columns: repeat(6, 1fr);
//           max-width: 1400px;
//           margin: 0 auto;
//         }

//         .cta-heading {
//           font-size: 120px;
//           font-weight: 700;
//           line-height: 0.95;
//           letter-spacing: -0.03em;
//           color: #000;
//           grid-column: span 4 / span 4;
//           white-space: nowrap;
//         }

//         .mobile-text {
//           display: none;
//         }

//         .desktop-text {
//           display: block;
//         }

//         .cta-heading2 {
//           font-size: 120px;
//           font-weight: 700;
//           line-height: 0.95;
//           letter-spacing: -0.03em;
//           grid-column: span 4 / span 4;
//           grid-row: span 2 / span 2;
//           grid-column-start: 2;
//           grid-row-start: 2;
//           white-space: nowrap;
//         }

//         .cta-btn-styled {
//           margin: 40px 0 20px 0;
//           display: inline-flex;
//           align-items: center;
//           text-transform: uppercase;
//           padding: 10px 18px;
//           background: #080807;
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 50px;
//           color: white;
//           text-decoration: none;
//           font-weight: 400;
//           font-size: 18px;
//           transition: all 0.3s ease;
//           overflow: hidden;
//           white-space: nowrap;
//           cursor: pointer;
//           position: relative;
//         }

//         .cta-btn-styled span {
//           color: #fff;
//           display: block;
//           position: relative;
//         }

//         .cta-btn-styled::after {
//           content: "";
//           width: 8px;
//           height: 8px;
//           background: #fff;
//           border: 2px solid #000;
//           border-radius: 50%;
//           margin-left: 8px;
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//         }

//         .cta-btn-styled:hover::after {
//           background: #fff;
//           border-color: #fff;
//         }

//         .cta-btn-section {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .cta-btn {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           margin: 6rem 0 3rem 0;
//         }

//         /* Mobile responsive */
//         @media (max-width: 768px) {
//           .desktop-text {
//             display: none;
//           }

//           .mobile-text {
//             display: block;
//           }

//           .cta-heading {
//             font-size: clamp(3rem, 10vw, 5rem);
//             font-weight: 700;
//             line-height: 1.1;
//             white-space: normal;
//             text-align: left;
//           }
//           .cta-heading h1 {
//             margin-bottom: 0px;
//           }
//           .cta-heading span {
//             margin-bottom: 0px;
//           }

//           body {
//             padding: 30px 15px;
//           }

//           .cta-btn-styled {
//             font-size: 16px;
//             padding: 12px 20px;
//           }

//           .cta-heading2 {
//             font-size: clamp(3rem, 10vw, 5rem);
//             font-weight: 700;
//             line-height: 1.1;
//             margin-bottom: 40px;
//             white-space: normal;
//             text-align: left;
//           }

//           .cta-section {
//             grid-template-columns: 1fr;
//           }

//           .cta-heading2 {
//             grid-column-start: 1;
//             grid-row-start: 2;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

import React, { useEffect } from "react";
import gsap from "gsap";
import "../styles/CtaSection.css"; // ✅ Import external stylesheet

export default function CTASection() {
  useEffect(() => {
    const createSlideUpEffect = (element) => {
      let span = element.querySelector("span");

      if (!span) {
        const originalText = element.textContent;
        element.innerHTML = `<span>${originalText}</span>`;
        span = element.querySelector("span");
      }

      if (span.querySelector(".text-original")) return;

      const originalText = span.textContent;
      span.innerHTML = `
        <span class="text-original">${originalText}</span>
        <span class="text-hover">${originalText}</span>
      `;

      const originalSpan = span.querySelector(".text-original");
      const hoverSpan = span.querySelector(".text-hover");

      gsap.set(span, {
        overflow: "hidden",
        height: "auto",
        position: "relative",
        display: "block",
      });

      gsap.set(originalSpan, {
        y: 0,
        position: "relative",
        display: "block",
      });
      gsap.set(hoverSpan, {
        y: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(originalSpan, {
        y: "-100%",
        duration: 0.3,
        ease: "power2.out",
      }).to(hoverSpan, { y: 0, duration: 0.3, ease: "power2.out" }, 0);

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

  return (
    <section className="cta-btn">
      <div className="cta-section">
        <div className="cta-heading">
          <span className="desktop-text">FOCUSED ON QUALITY</span>
          <span className="mobile-text">
            FOCUSED ON
            <br />
            QUALITY
          </span>
        </div>
        <div className="cta-heading2">
          <span className="desktop-text">DRIVEN BY CREATIVITY</span>
          <span className="mobile-text">
            DRIVEN BY
            <br />
            CREATIVITY
          </span>
        </div>
      </div>
      <div className="cta-btn-section">
        <a href="#" className="cta-btn-styled">
          <span>tell us about your project</span>
        </a>
      </div>
    </section>
  );
}
