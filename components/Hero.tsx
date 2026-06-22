import { motion } from 'framer-motion';

interface HeroProps {
  heroPill: string;
  heroTagline: string;
  aboutContent: string;
  email: string;
  github: string;
  orcid: string;
}

export default function Hero({ heroPill, heroTagline, aboutContent, email, github, orcid }: HeroProps) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-14 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 w-full"
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase mb-10">
          [ {heroPill} ]
        </p>

        <h1 className="font-serif text-8xl md:text-9xl font-bold text-white leading-none mb-6">
          Haiyi Li
        </h1>

        <p className="font-sans text-xl text-white/55 font-light mb-10">
          {heroTagline}
        </p>

        <div className="w-full h-px bg-white/10 mb-10" />

        <p className="font-sans text-[1.15rem] text-white/75 leading-[1.9] max-w-[65ch] mb-12">
          {aboutContent}
        </p>

        <div className="flex flex-wrap gap-6">
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            {email}
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href={orcid}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            ORCID
          </a>
        </div>
      </motion.div>
    </section>
  );
}
