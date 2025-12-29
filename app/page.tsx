import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory main-scroll-container">
        <HeroSection />
        <AboutSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </>
  );
}