"use client";
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {

  const [showArrow, setShowArrow] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setShowArrow(entries[0].isIntersecting);
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: document.querySelector('.main-scroll-container'),
      threshold: 0.5,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to next section
  const handleArrowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.querySelector('.main-scroll-container');
    const aboutSection = document.getElementById('about');
    if (container && aboutSection) {
      const containerRect = container.getBoundingClientRect();
      const aboutRect = aboutSection.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const offset = aboutRect.top - containerRect.top + scrollTop;
      (container as HTMLElement).scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="relative h-screen flex snap-start snap-always overflow-hidden">
      <Image
        src="/home.jpeg"
        alt="Background"
        fill
        className="object-cover object-bottom"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-end justify-end w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-[18vh] sm:pb-[22vh] md:pb-[25vh]">
        <div className="text-right w-full max-w-full sm:max-w-[80vw]">
          <h1 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white break-words"
            style={{
              animation: 'slideInRight 1.2s ease-out forwards',
              opacity: 0
            }}
          >
            Nicolas Lauzon
          </h1>
          <p 
            className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wider text-white/90 mt-2 md:mt-4"
            style={{
              animation: 'slideInRight 1.2s ease-out 0.3s forwards',
              opacity: 0
            }}
          >
            Coach de vélo de montagne
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      {/* Fixed down arrow for scroll suggestion, only on home, with fade/slide animation */}
      {showArrow && (
        <a
          href="#about"
          onClick={handleArrowClick}
          className="fixed left-1/2 bottom-6 -translate-x-1/2 z-40 cursor-pointer select-none transition-all duration-700 opacity-100 translate-y-0"
          aria-label="Aller à la section suivante"
          style={{ pointerEvents: 'auto', transition: 'opacity 0.7s, transform 0.7s' }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down drop-shadow-lg">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      )}
    </section>
  );

  };