import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative h-screen flex items-center justify-center snap-start snap-always">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl h-full px-2 sm:px-4 md:px-12 gap-4 md:gap-0 overflow-y-auto md:overflow-visible pb-20 md:pb-0" style={{maxHeight: '100vh'}}>
        {/* Portrait on the left (top on mobile) */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:h-[80vh] md:max-w-xl md:order-1 order-1 md:mt-0 mt-4 pt-10 sm:pt-12 md:pt-0">
          <Image
            src="/Desktop.png"
            alt="Nicolas Lauzon portrait"
            width={400}
            height={533}
            className="object-cover object-[40%_center] w-full h-auto rounded-2xl shadow-2xl"
            priority
          />
        </div>
        {/* About text on the right (bottom on mobile) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-16 mt-4 md:mt-0 md:order-2 order-2">
          <blockquote className="relative rounded-md p-2 sm:p-4 md:p-6 text-xs sm:text-base md:text-xl font-semibold text-white/90 shadow-lg animate-slide-in-right max-w-full md:max-w-xl w-full overflow-visible">
            <span className="absolute left-2 top-2 sm:left-4 sm:top-4 text-xl sm:text-3xl md:text-4xl text-white select-none">“</span>
            <span className="pl-4 sm:pl-8 block whitespace-pre-line text-justify break-words">
Rapidement après avoir fait mes premiers pas, j’étais sur un vélo. Une fois libéré de mes roues stabilisatrices, je parcourais les chemins forestiers.

Depuis, mon envie d’aventure m’a poussé vers les jumps, les racines et les roches des trails d’enduro.

Je souhaite un coaching agréable, dynamique et qui répond bien aux objectifs des élèves avec une approche amicale et professionnelle.

L’objectif de mes cours ? Progresser dans le plaisir et la sécurité !
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
