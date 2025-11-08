import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonials from "../components/Testimonials";
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
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Detect if mobile
    const isMobile = window.innerWidth < 900;

    wrapperRefs.current.forEach((wrapper, i) => {
      if (!wrapper || !slideRefs.current[i]) return;

      const card = slideRefs.current[i];
      let scale = 1;
      let rotationZ = 0;
      let rotationX = 0;

      if (i !== slideRefs.current.length - 1) {
        // Mobile: less dramatic effect
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
      <Testimonials />
      <Footer />

      {/* Dummy Section After */}
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
