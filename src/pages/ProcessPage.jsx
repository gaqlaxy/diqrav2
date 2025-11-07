// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../styles/ProcessPage.css";

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

// export default function ProcessPage() {
//   const wrapperRefs = useRef([]);
//   const slideRefs = useRef([]);

//   // useEffect(() => {
//   //   const mm = gsap.matchMedia();

//   //   mm.add(
//   //     "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
//   //     () => {
//   //       wrapperRefs.current.forEach((wrapper, i) => {
//   //         if (!wrapper || !slideRefs.current[i]) return;

//   //         const card = slideRefs.current[i];
//   //         let scale = 1;
//   //         let rotationZ = 0;
//   //         let rotationX = 0;

//   //         if (i !== slideRefs.current.length - 1) {
//   //           scale = 0.4 + 0.025 * i;
//   //           rotationZ = 5;
//   //           rotationX = 40;
//   //         }

//   //         gsap.to(card, {
//   //           scale,
//   //           rotationX,
//   //           rotationZ,
//   //           transformOrigin: "50% center",
//   //           ease: "none",
//   //           scrollTrigger: {
//   //             trigger: wrapper,
//   //             start: "top top",
//   //             end: "bottom bottom",
//   //             endTrigger: slideRefs.current[slideRefs.current.length - 1],
//   //             scrub: 1,
//   //             pin: wrapper,
//   //             pinSpacing: false,
//   //             id: i + 1,
//   //           },
//   //         });
//   //       });
//   //     }
//   //   );

//   //   return () => {
//   //     mm.revert();
//   //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   //   };
//   // }, []);
//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (prefersReducedMotion) return;

//     // Detect if mobile
//     const isMobile = window.innerWidth < 900;

//     wrapperRefs.current.forEach((wrapper, i) => {
//       if (!wrapper || !slideRefs.current[i]) return;

//       const card = slideRefs.current[i];
//       let scale = 1;
//       let rotationZ = 0;
//       let rotationX = 0;

//       if (i !== slideRefs.current.length - 1) {
//         // Mobile: less dramatic effect
//         scale = isMobile ? 0.6 + 0.05 * i : 0.4 + 0.025 * i;
//         rotationZ = isMobile ? 3 : 5;
//         rotationX = isMobile ? 20 : 40;
//       }

//       gsap.to(card, {
//         scale,
//         rotationX,
//         rotationZ,
//         transformOrigin: "50% center",
//         ease: "none",
//         scrollTrigger: {
//           trigger: wrapper,
//           start: "top top",
//           end: "bottom bottom",
//           endTrigger: slideRefs.current[slideRefs.current.length - 1],
//           scrub: 1,
//           pin: wrapper,
//           pinSpacing: false,
//           id: i + 1,
//         },
//       });
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);
//   useEffect(() => {
//     scrollTo(0, 0);
//   });

//   return (
//     <div className="process-page">
//       {/* Dummy Section Before */}
//       <section>
//         <div className="process-head-content">
//           <p>(Our Process)</p>
//           <div>
//             <p>
//               Great architecture isn’t just about talent and experience, but
//               collaborations and relationships.
//             </p>
//             <img
//               src="https://website-data-pluckwalk.s3-ap-south-1.amazonaws.com/test/kYPfqrWt8C7uRmJ5U4cofX.jpeg"
//               alt=""
//             />
//           </div>
//         </div>
//       </section>
//       <section className="process-page-dummy-section process-page-before">
//         <div className="process-page-dummy-content">
//           <h1>Welcome Section</h1>
//           <p>
//             This is a dummy section before the scroll cards. You can modify this
//             content however you like.
//           </p>
//           <p>Add your hero content, intro text, or any other elements here.</p>
//         </div>
//       </section>

//       <section className="process-page-content">
//         <div className="process-page-content-inner">
//           {cardData.map((card, index) => (
//             <div
//               key={index}
//               className="process-page-content-wrapper"
//               ref={(el) => (wrapperRefs.current[index] = el)}
//             >
//               <div
//                 className={`process-page-content-slide process-page-${card.color}`}
//                 ref={(el) => (slideRefs.current[index] = el)}
//               >
//                 <div className="process-page-content-slide-inner">
//                   <div>
//                     <p className="process-page-content-number">
//                       {"{ " + card.number + " }"}
//                     </p>
//                     <h2 className="process-page-content-title process-page-heading-lg">
//                       {card.title}
//                     </h2>
//                   </div>
//                   <div>
//                     <p className="process-page-content-copy">{card.copy}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="process-page-spacer"></div>

//       {/* Dummy Section After */}
//       <section className="process-page-dummy-section process-page-after">
//         <div className="process-page-dummy-content">
//           <h1>Closing Section</h1>
//           <p>
//             This is a dummy section after the scroll cards. Perfect for CTAs,
//             contact forms, or footer content.
//           </p>
//           <p>Customize this area to fit your needs.</p>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
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
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroSectionRef = useRef(null);

  // Card stack animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 900;

    wrapperRefs.current.forEach((wrapper, i) => {
      if (!wrapper || !slideRefs.current[i]) return;

      const card = slideRefs.current[i];
      let scale = 1;
      let rotationZ = 0;
      let rotationX = 0;

      if (i !== slideRefs.current.length - 1) {
        scale = isMobile ? 0.6 + 0.05 * i : 0.4 + 0.025 * i;
        rotationZ = isMobile ? 3 : 5;
        rotationX = isMobile ? 20 : 40;
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // useEffect(() => {
  //   const mm = gsap.matchMedia();

  //   mm.add(
  //     "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
  //     () => {
  //       wrapperRefs.current.forEach((wrapper, i) => {
  //         if (!wrapper || !slideRefs.current[i]) return;

  //         const card = slideRefs.current[i];
  //         let scale = 1;
  //         let rotationZ = 0;
  //         let rotationX = 0;

  //         if (i !== slideRefs.current.length - 1) {
  //           scale = 0.4 + 0.025 * i;
  //           rotationZ = 5;
  //           rotationX = 40;
  //         }

  //         gsap.to(card, {
  //           scale,
  //           rotationX,
  //           rotationZ,
  //           transformOrigin: "50% center",
  //           ease: "none",
  //           scrollTrigger: {
  //             trigger: wrapper,
  //             start: "top top",
  //             end: "bottom bottom",
  //             endTrigger: slideRefs.current[slideRefs.current.length - 1],
  //             scrub: 1,
  //             pin: wrapper,
  //             pinSpacing: false,
  //             id: i + 1,
  //           },
  //         });
  //       });
  //     }
  //   );

  //   return () => {
  //     mm.revert();
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  // Parallax hero animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Background image parallax - moves slower than scroll
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        y: "30%",
        scale: 1.1,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Content stays relatively in place (subtle movement)
    const contentElements = [
      heroTitleRef.current,
      heroSubtitleRef.current,
      heroTextRef.current,
    ];
    contentElements.forEach((el) => {
      if (el) {
        gsap.to(el, {
          y: 50,
          opacity: 0.8,
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div className="process-page">
      {/* Parallax Hero Section */}
      <section ref={heroSectionRef} style={styles.heroSection}>
        {/* Background Image with Parallax */}
        <div style={styles.heroImageBackground}>
          <img
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1489514354504-1653aa90e34e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871"
            alt="Construction Process"
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay}></div>
        </div>

        {/* Content on top */}
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <p ref={heroSubtitleRef} style={styles.heroSubtitle}>
              (Our Process)
            </p>
            <h1 ref={heroTitleRef} style={styles.heroTitle}>
              OVERVIEW OF
              <br />
              OUR 6-STAGE
              <br />
              PROCESS
            </h1>
            <p ref={heroTextRef} style={styles.heroText}>
              Great architecture isn't just about talent and experience, but
              collaborations and relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Card Stack Section */}
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
      <Testimonials />
      <CtaSection />
      <Footer />
      {/* Closing Section */}
      {/* <section className="process-page-dummy-section process-page-after">
        <div className="process-page-dummy-content">
          <h1>Closing Section</h1>
          <p>
            This is a dummy section after the scroll cards. Perfect for CTAs,
            contact forms, or footer content.
          </p>
          <p>Customize this area to fit your needs.</p>
        </div>
      </section> */}
    </div>
  );
}

const styles = {
  heroSection: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "2rem",
  },
  heroImageBackground: {
    position: "absolute",
    top: "-10%",
    left: 0,
    width: "100%",
    height: "120%",
    // add linear background of dark shade to the image

    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",

    display: "block",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    zIndex: 1,
  },
  heroContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 2,
  },
  heroContent: {
    color: "black",
    maxWidth: "700px",
  },
  heroSubtitle: {
    fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    // fontWeight: 700,
    fontWeight: "500",
    opacity: 0.7,
    marginBottom: "2rem",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: "2rem",
    letterSpacing: "-0.02em",
  },
  heroText: {
    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
    lineHeight: 1.7,
    maxWidth: "500px",
    opacity: 0.9,
  },
};
