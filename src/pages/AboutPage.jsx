import React, { useEffect } from "react";
import "../styles/AboutPage.css";

export default function About() {
  useEffect(() => {
    // Team section hover functionality
    const teamMembers = document.querySelectorAll(".team-member");
    const teamImages = document.querySelectorAll(".team-image");

    teamMembers.forEach((member) => {
      member.addEventListener("mouseenter", () => {
        const memberData = member.getAttribute("data-member");

        // Remove active class
        teamMembers.forEach((m) => m.classList.remove("active"));
        teamImages.forEach((img) => img.classList.remove("active"));

        // Add active class to current member and image
        member.classList.add("active");
        const correspondingImage = document.querySelector(
          `.team-image[data-member="${memberData}"]`
        );
        if (correspondingImage) correspondingImage.classList.add("active");
      });
    });

    // CTA Button slide-up animation
    const viewAllBtn = document.querySelector(".view-all");
    if (viewAllBtn) {
      const span = viewAllBtn.querySelector("span");
      const originalText = span.textContent;

      span.innerHTML = `
        <span class="text-original" style="display:block;position:relative;">${originalText}</span>
        <span class="text-hover" style="display:block;position:absolute;top:100%;left:0;width:100%;">${originalText}</span>
      `;

      span.style.overflow = "hidden";
      span.style.position = "relative";
      span.style.display = "block";
      span.style.height =
        span.querySelector(".text-original").offsetHeight + "px";

      viewAllBtn.addEventListener("mouseenter", () => {
        const textOriginal = span.querySelector(".text-original");
        const textHover = span.querySelector(".text-hover");

        textOriginal.style.transition =
          "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        textHover.style.transition =
          "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        textOriginal.style.transform = "translateY(-100%)";
        textHover.style.transform = "translateY(-100%)";
      });

      viewAllBtn.addEventListener("mouseleave", () => {
        const textOriginal = span.querySelector(".text-original");
        const textHover = span.querySelector(".text-hover");
        textOriginal.style.transform = "translateY(0)";
        textHover.style.transform = "translateY(0)";
      });
    }
  }, []);

  return (
    <main>
      {/* about-page Hero Section */}
      <section
        className="about-page-hero"
        role="banner"
        aria-label="about-page us hero section"
      >
        <div className="about-page-hero-content">
          <div className="about-page-hero-text">
            <h1 className="about-page-title">DIQRA</h1>
          </div>
          <div className="about-page-hero-image">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop"
              alt="DIQRA Architects Studio"
            />
          </div>
        </div>
      </section>

      {/* about-page Content Section */}
      <section className="about-page-content">
        <div className="about-page-section">
          <div className="about-page-section-content">
            <p>
              At DIQRA, we take a collaborative approach. Whether we're working
              in the studio or alongside our clients and partners, it's this
              shared process that helps us create work that reflects both your
              vision and ours.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Image Section */}
      <section className="about-page-content">
        <div className="second-about-page">
          <div className="leftabout-page">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop"
              alt="Architectural detail"
            />
          </div>
          <div className="rightabout-page">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=700&fit=crop"
              alt="Interior design space"
            />
            <p className="about-page-second-section-content">
              We believe that architecture is a reflection of the people who
              inhabit it. Our goal is to create spaces that are not only
              beautiful but also functional and meaningful. We listen to your
              needs, understand your vision, and work with you to bring it to
              life.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="services-offer-section">
        <div className="services-offer-container">
          <div className="services-offer-header">
            <div className="header-left">
              <div className="label">WHAT WE DO</div>
              <h2 className="services-offer-title">Our Services</h2>
            </div>
            <div className="header-right">
              <a href="#services" className="view-all">
                <span>View all</span>
              </a>
            </div>
          </div>

          <div className="services-offer-grid">
            {/* Service 1 */}
            <a href="#exterior" className="service-offer-item">
              <div className="icon-container">
                <svg
                  className="icon"
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
              <div className="service-content">
                <h3>Exterior Design</h3>
                <p>
                  Elevate the curb appeal and functionality of your property
                  with our exterior design services.
                </p>
              </div>
            </a>

            {/* Service 2 */}
            <a href="#design-planning" className="service-offer-item">
              <div className="icon-container">
                <svg
                  className="icon"
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
              <div className="service-content">
                <h3>Design & Planning</h3>
                <p>
                  We'll transform your ideas into a cohesive plan that sets the
                  stage for a seamless and successful execution.
                </p>
              </div>
            </a>

            {/* Service 3 */}
            <a href="#consultation" className="service-offer-item">
              <div className="icon-container">
                <svg
                  className="icon"
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
              <div className="service-content">
                <h3>Consultation</h3>
                <p>
                  Our consultation services offer personalized guidance &
                  expertise to help you navigate the complexities.
                </p>
              </div>
            </a>
          </div>

          <div className="inquiry">
            <div>Do you have any project on your mind? Call Us:</div>
            <a href="tel:+37855501108" className="inquiry-number">
              +(378) 555-0108
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-content">
            <div className="team-left">
              <h2 className="team-title">Meet the Team</h2>
              <div className="team-members">
                <div className="team-member active" data-member="naveen">
                  <h3 className="member-name">Naveen</h3>
                  <p className="member-role">Co-Founder & CEO</p>
                  <p className="member-description">
                    With over 15 years of experience in sustainable design,
                    Naveen leads our residential and commercial projects with a
                    focus on environmental responsibility and innovative
                    solutions.
                  </p>
                  <div className="team-member-image">
                    <img
                      src="https://images.unsplash.com/photo-1581094480465-4e6c25fb4a52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                      alt="Naveen"
                    />
                  </div>
                </div>

                <div className="team-member" data-member="jafar">
                  <h3 className="member-name">Jafar Sathik</h3>
                  <p className="member-role">
                    Co-Founder & Principal Architect
                  </p>
                  <p className="member-description">
                    Jafar brings a unique perspective to interior design and
                    spatial planning, combining modern aesthetics with
                    functional excellence to create inspiring environments.
                  </p>
                  <div className="team-member-image">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1664300982961-f57190dca362?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                      alt="Jafar Sathik"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="team-right">
              <div className="team-image-container">
                <img
                  src="https://images.unsplash.com/photo-1581094480465-4e6c25fb4a52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                  alt="Naveen"
                  className="team-image active"
                  data-member="naveen"
                />
                <img
                  src="https://plus.unsplash.com/premium_photo-1664300982961-f57190dca362?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                  alt="Jafar Sathik"
                  className="team-image"
                  data-member="jafar"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
