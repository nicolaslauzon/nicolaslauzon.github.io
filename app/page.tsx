
"use client";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionIds = ["home", "about", "formations", "contact"];
  // Prevent multiple scrolls at once
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let lastScrollTime = 0;
    const minInterval = 700; // ms between scrolls

    const getCurrentSectionIdx = () => {
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && container) {
          const containerRect = container.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const relativeTop = elRect.top - containerRect.top;
          const relativeBottom = elRect.bottom - containerRect.top;
          if (relativeTop <= 120 && relativeBottom > 120) {
            return i;
          }
        }
      }
      return 0;
    };

    const scrollToSection = (idx: number) => {
      const el = document.getElementById(sectionIds[idx]);
      if (el && container) {
        const containerRect = container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const offset = elRect.top - containerRect.top + scrollTop;
        container.scrollTo({ top: offset, behavior: "smooth" });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isScrolling.current || now - lastScrollTime < minInterval) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;
      e.preventDefault();
      const idx = getCurrentSectionIdx();
      let nextIdx = idx;
      if (delta > 0 && idx < sectionIds.length - 1) nextIdx = idx + 1;
      else if (delta < 0 && idx > 0) nextIdx = idx - 1;
      if (nextIdx !== idx) {
        isScrolling.current = true;
        scrollToSection(nextIdx);
        lastScrollTime = now;
        setTimeout(() => {
          isScrolling.current = false;
        }, minInterval);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Header />
      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory main-scroll-container"
        style={{ scrollBehavior: "smooth" }}
      >
        <HeroSection />
        <AboutSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </>
  );
}