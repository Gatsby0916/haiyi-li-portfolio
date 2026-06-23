import { motion } from 'framer-motion';
import { GitHubIcon, LinkedInIcon, GoogleScholarIcon, OrcidIcon, HarvardShield } from './Icons';

interface HeroProps {
  heroPill: string;
  heroTagline: string;
  aboutContent: string;
  email: string;
  github: string;
  linkedin: string;
  googleScholar: string;
  orcid: string;
}

export default function Hero({ heroPill, heroTagline, aboutContent, email, github, linkedin, googleScholar, orcid }: HeroProps) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-14 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 w-full"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase mb-10 flex items-center gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          [ {heroPill} ]
        </p>

        <h1 className="font-serif text-[2.6rem] md:text-[3.8rem] lg:text-[5rem] font-bold text-white leading-none mb-7">
          Haiyi Li
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <HarvardShield className="h-8 w-auto shrink-0 opacity-90" />
          <p className="font-sans text-sm md:text-base text-white/55 font-light">
            {heroTagline}
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/8 to-transparent mb-10" />

        <p className="font-sans text-[1.25rem] md:text-[1.35rem] text-white/75 leading-[1.9] max-w-[65ch] mb-12">
          {aboutContent}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${email}`}
            className="font-mono text-sm text-white/35 hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            {email}
          </a>

          <span className="text-white/15 select-none">|</span>

          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="text-white/35 hover:text-white/75 transition-colors"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="text-white/35 hover:text-white/75 transition-colors"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>

          <a
            href={googleScholar}
            target="_blank"
            rel="noreferrer"
            title="Google Scholar"
            className="text-white/35 hover:text-white/75 transition-colors"
          >
            <GoogleScholarIcon className="w-5 h-5" />
          </a>

          <a
            href={orcid}
            target="_blank"
            rel="noreferrer"
            title="ORCID"
            className="text-white/35 hover:text-white/75 transition-colors"
          >
            <OrcidIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
