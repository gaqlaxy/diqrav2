// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

// const cardData = [
//   {
//     number: "01",
//     title: "Bring Ideas to Life",
//     copy: "Animation isn't just decoration — it's how we guide attention, create clarity, and make interfaces feel alive. In this session, you'll get hands-on with techniques that transform static layouts into stories.",
//     color: "green",
//   },
//   {
//     number: "02",
//     title: "Learn by Doing",
//     copy: "Instead of watching slides fly past, you'll code along, experiment, and break things. Each exercise is designed to teach you a practical skill you can immediately put into practice.",
//     color: "white",
//   },
//   {
//     number: "03",
//     title: "Build Your Toolkit",
//     copy: "By the end of the workshop, you'll hopefully walk away with some helpful snippets, animation principles that stand the test of time, and the confidence to design smoother, smarter interactions.",
//     color: "orange",
//   },
//   {
//     number: "04",
//     title: "Find the Rhythm",
//     copy: "Every interaction has a tempo. Some movements are quick and direct, others linger just long enough to create a sense of flow. Learning to notice and shape this rhythm helps everything feel more natural, more connected.",
//     color: "lilac",
//   },
// ];

// export default function ScrollCards() {
//   const wrapperRefs = useRef([]);
//   const slideRefs = useRef([]);

//   useEffect(() => {
//     const mm = gsap.matchMedia();

//     mm.add(
//       "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
//       () => {
//         wrapperRefs.current.forEach((wrapper, i) => {
//           if (!wrapper || !slideRefs.current[i]) return;

//           const card = slideRefs.current[i];
//           let scale = 1;
//           let rotationZ = 0;
//           let rotationX = 0;

//           if (i !== slideRefs.current.length - 1) {
//             scale = 0.4 + 0.025 * i;
//             rotationZ = 5;
//             rotationX = 40;
//           }

//           gsap.to(card, {
//             scale,
//             rotationX,
//             rotationZ,
//             transformOrigin: "50% center",
//             ease: "none",
//             scrollTrigger: {
//               trigger: wrapper,
//               start: "top top",
//               end: "bottom bottom",
//               endTrigger: slideRefs.current[slideRefs.current.length - 1],
//               scrub: 1,
//               pin: wrapper,
//               pinSpacing: false,
//               id: i + 1,
//             },
//           });
//         });
//       }
//     );

//     return () => {
//       mm.revert();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div style={{ background: "#111", minHeight: "100vh" }}>
//       {/* Dummy Section Before */}
//       <section className="dummy-section before">
//         <div className="dummy-content">
//           <h1>Welcome Section</h1>
//           <p>
//             This is a dummy section before the scroll cards. You can modify this
//             content however you like.
//           </p>
//           <p>Add your hero content, intro text, or any other elements here.</p>
//         </div>
//       </section>

//       <section className="content">
//         <div className="content-inner">
//           {cardData.map((card, index) => (
//             <div
//               key={index}
//               className="content-wrapper"
//               ref={(el) => (wrapperRefs.current[index] = el)}
//             >
//               <div
//                 className={`content-slide ${card.color}`}
//                 ref={(el) => (slideRefs.current[index] = el)}
//               >
//                 <div className="content-slide-inner">
//                   <div>
//                     <p className="content-number">
//                       {"{ " + card.number + " }"}
//                     </p>
//                     <h2 className="content-title heading-lg">{card.title}</h2>
//                   </div>
//                   <div>
//                     <p className="content-copy">{card.copy}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="spacer"></div>

//       {/* Dummy Section After */}
//       <section className="dummy-section after">
//         <div className="dummy-content">
//           <h1>Closing Section</h1>
//           <p>
//             This is a dummy section after the scroll cards. Perfect for CTAs,
//             contact forms, or footer content.
//           </p>
//           <p>Customize this area to fit your needs.</p>
//         </div>
//       </section>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
//           color: #333;
//         }

//         .content-wrapper {
//           perspective: 800px;
//         }

//         .content-slide {
//           color: #111;
//           padding: 3rem 1rem 6rem 1rem;
//         }

//         .content-slide-inner {
//           position: relative;
//           max-width: 1200px;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           height: 100%;
//           gap: 2rem;
//         }

//         .content-slide.green {
//           background: #c9f6b4;
//         }

//         .content-slide.white {
//           background: #f5f5f5;
//         }

//         .content-slide.orange {
//           background: #ffd9b0;
//         }

//         .content-slide.lilac {
//           background: #c4bafe;
//         }

//         .content-title {
//           color: #111;
//           margin-top: 0.5rem;
//         }

//         .content-copy {
//           max-width: 50ch;
//           font-size: clamp(1rem, 2vw, 1.5rem);
//           line-height: 1.6;
//         }

//         .content-number {
//           font-size: clamp(1rem, 3vw, 3rem);
//           opacity: 0.5;
//           font-weight: 500;
//         }

//         .heading-lg {
//           font-size: 8vw;
//           font-weight: 700;
//           line-height: 1.1;
//         }

//         @media (min-width: 900px) {
//           .content-slide {
//             height: calc(100vh - 80px);
//             transform-style: preserve-3d;
//           }

//           .content-slide-inner {
//             gap: 4rem;
//           }
//         }

//         @media (min-width: 1200px) {
//           .heading-lg {
//             font-size: clamp(4rem, 8vw, 8rem);
//           }
//         }

//         .spacer {
//           height: 100vh;
//         }

//         /* Dummy Sections Styling */
//         .dummy-section {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 4rem 2rem;
//         }

//         .dummy-section.before {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }

//         .dummy-section.after {
//           background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
//         }

//         .dummy-content {
//           max-width: 800px;
//           text-align: center;
//           color: white;
//         }

//         .dummy-content h1 {
//           font-size: clamp(2rem, 5vw, 4rem);
//           margin-bottom: 1.5rem;
//           font-weight: 700;
//         }

//         .dummy-content p {
//           font-size: clamp(1rem, 2vw, 1.25rem);
//           line-height: 1.6;
//           margin-bottom: 1rem;
//           opacity: 0.9;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ProcessPage.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    number: "01",
    title: "Bring Ideas to Life",
    copy: "Animation isn't just decoration — it's how we guide attention, create clarity, and make interfaces feel alive. In this session, you'll get hands-on with techniques that transform static layouts into stories.",
    color: "green",
  },
  {
    number: "02",
    title: "Learn by Doing",
    copy: "Instead of watching slides fly past, you'll code along, experiment, and break things. Each exercise is designed to teach you a practical skill you can immediately put into practice.",
    color: "white",
  },
  {
    number: "03",
    title: "Build Your Toolkit",
    copy: "By the end of the workshop, you'll hopefully walk away with some helpful snippets, animation principles that stand the test of time, and the confidence to design smoother, smarter interactions.",
    color: "orange",
  },
  {
    number: "04",
    title: "Find the Rhythm",
    copy: "Every interaction has a tempo. Some movements are quick and direct, others linger just long enough to create a sense of flow. Learning to notice and shape this rhythm helps everything feel more natural, more connected.",
    color: "lilac",
  },
];

export default function ProcessPage() {
  const wrapperRefs = useRef([]);
  const slideRefs = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
      () => {
        wrapperRefs.current.forEach((wrapper, i) => {
          if (!wrapper || !slideRefs.current[i]) return;

          const card = slideRefs.current[i];
          let scale = 1;
          let rotationZ = 0;
          let rotationX = 0;

          if (i !== slideRefs.current.length - 1) {
            scale = 0.4 + 0.025 * i;
            rotationZ = 5;
            rotationX = 40;
          }

          gsap.to(card, {
            scale,
            rotationX,
            rotationZ,
            transformOrigin: "50% center",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "bottom bottom",
              endTrigger: slideRefs.current[slideRefs.current.length - 1],
              scrub: 1,
              pin: wrapper,
              pinSpacing: false,
              id: i + 1,
            },
          });
        });
      }
    );

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  });

  return (
    <div className="process-page">
      {/* Dummy Section Before */}
      <section className="process-page-dummy-section process-page-before">
        <div className="process-page-dummy-content">
          <h1>Welcome Section</h1>
          <p>
            This is a dummy section before the scroll cards. You can modify this
            content however you like.
          </p>
          <p>Add your hero content, intro text, or any other elements here.</p>
        </div>
      </section>

      <section className="process-page-content">
        <div className="process-page-content-inner">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="process-page-content-wrapper"
              ref={(el) => (wrapperRefs.current[index] = el)}
            >
              <div
                className={`process-page-content-slide process-page-${card.color}`}
                ref={(el) => (slideRefs.current[index] = el)}
              >
                <div className="process-page-content-slide-inner">
                  <div>
                    <p className="process-page-content-number">
                      {"{ " + card.number + " }"}
                    </p>
                    <h2 className="process-page-content-title process-page-heading-lg">
                      {card.title}
                    </h2>
                  </div>
                  <div>
                    <p className="process-page-content-copy">{card.copy}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="process-page-spacer"></div>

      {/* Dummy Section After */}
      <section className="process-page-dummy-section process-page-after">
        <div className="process-page-dummy-content">
          <h1>Closing Section</h1>
          <p>
            This is a dummy section after the scroll cards. Perfect for CTAs,
            contact forms, or footer content.
          </p>
          <p>Customize this area to fit your needs.</p>
        </div>
      </section>
    </div>
  );
}
