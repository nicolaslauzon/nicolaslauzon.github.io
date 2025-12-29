
import { FaEnvelope, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="relative h-screen flex items-center justify-center snap-start snap-always bg-neutral-950">
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-2 sm:px-0">
        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white text-center drop-shadow-2xl mb-6 sm:mb-8">Contact</h1>
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-wrap gap-6 sm:gap-8 mt-2 sm:mt-4 justify-center">
            {/* Email */}
            <a
              href="mailto:nicolas_lauzon@outlook.com"
              className="group flex flex-col items-center text-white hover:text-blue-400 transition min-w-[64px]"
              target="_blank" rel="noopener noreferrer" aria-label="Email"
            >
              <FaEnvelope className="w-8 h-8 mb-1" />
              <span className="text-xs sm:text-sm">Email</span>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/nicolas_lauzon09/"
              className="group flex flex-col items-center text-white hover:text-pink-400 transition min-w-[64px]"
              target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            >
              <FaInstagram className="w-8 h-8 mb-1" />
              <span className="text-xs sm:text-sm">Instagram</span>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/nicolas.lauzon.579997"
              className="group flex flex-col items-center text-white hover:text-blue-600 transition min-w-[64px]"
              target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            >
              <FaFacebook className="w-8 h-8 mb-1" />
              <span className="text-xs sm:text-sm">Facebook</span>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/nicolas-lauzon-6062341b7"
              className="group flex flex-col items-center text-white hover:text-blue-500 transition min-w-[64px]"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            >
              <FaLinkedin className="w-8 h-8 mb-1" />
              <span className="text-xs sm:text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
