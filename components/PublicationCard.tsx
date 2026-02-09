
import React from 'react';
import { Publication } from '../types';
import { FileText, Github, Globe, ScrollText, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PublicationCardProps {
  pub: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ pub }) => {
  // Function to highlight the user's name
  const formatAuthors = (authors: string[]) => (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm md:text-base leading-relaxed">
      {authors.map((author, index) => {
        const isMe = author.trim() === "Haiyi Li";
        return (
          <React.Fragment key={index}>
            <span className={isMe ? "font-bold text-slate-50" : "text-slate-200/70"}>
              {author}
            </span>
            {index < authors.length - 1 && <span className="text-white/10">·</span>}
          </React.Fragment>
        );
      })}
    </div>
  );

  const isContain = pub.imageFit === 'contain';
  const isPdf = pub.image?.toLowerCase().endsWith('.pdf');
  const containerBgClass = isContain ? 'bg-white' : 'bg-slate-100';
  const containerAspectClass = isPdf ? 'aspect-[4/3]' : (!isContain ? 'aspect-[16/10]' : '');
  const imageFitClass = isContain ? 'h-auto object-contain p-5 mx-auto max-w-full' : 'h-full object-cover w-full';
  const containMaxHeight = pub.imageMaxHeight ?? 560;
  const imageStyle: React.CSSProperties | undefined = isContain ? { maxHeight: containMaxHeight } : undefined;

  const statusStyles: Record<Publication['status'], string> = {
    Published: "text-slate-200 bg-white/5 border border-white/10",
    "Under Review": "text-primary-200 bg-primary-500/10 border border-primary-500/20",
    Submitted: "text-slate-200/80 bg-white/5 border border-white/10",
    "Conditionally Accepted": "text-emerald-200 bg-emerald-500/10 border border-emerald-500/20",
    Accepted: "text-emerald-200 bg-emerald-500/10 border border-emerald-500/20"
  };

  const venueLabel = pub.venue.trim();
  const displayVenue = venueLabel.includes(pub.year) ? venueLabel : `${venueLabel} ${pub.year}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group flex flex-col md:grid md:grid-cols-12 gap-12 p-7 md:p-10 rounded-3xl border border-white/10 bg-[#0b1220] shadow-[0_24px_70px_rgba(2,6,23,0.18)] hover:border-white/20 transition-colors"
    >
      {/* Image Column */}
      <div className="md:col-span-6">
        <div className={`relative w-full overflow-hidden rounded-2xl border border-white/10 ${containerBgClass} shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-white/20 ${containerAspectClass}`}>
          {pub.image ? (
            isPdf ? (
              <object data={`${pub.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" className="w-full h-full">
                <div className="flex h-full min-h-[280px] w-full items-center justify-center bg-slate-50 text-xs text-slate-500 font-mono">
                  PDF preview unavailable.{' '}
                  {pub.links?.pdf ? (
                    <a href={pub.links.pdf} target="_blank" rel="noreferrer" className="ml-2 text-primary-800 underline">
                      Open PDF
                    </a>
                  ) : (
                    <a href={pub.image} target="_blank" rel="noreferrer" className="ml-2 text-primary-800 underline">
                      Open PDF
                    </a>
                  )}
                </div>
              </object>
            ) : (
              <>
                <motion.img 
                  whileHover={!isContain ? { scale: 1.03 } : { scale: 1.0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={pub.image} 
                  alt={pub.title} 
                  style={imageStyle}
                  className={`${imageFitClass} opacity-95 group-hover:opacity-100 transition-opacity`}
                />
                {/* Overlay for interaction hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                   <div className="bg-white/90 backdrop-blur rounded-full p-2 text-slate-700 shadow-sm">
                      <Maximize2 size={16} />
                   </div>
                </div>
              </>
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-xs text-slate-400 font-mono">
              [Figure]
            </div>
          )}
        </div>
      </div>

      {/* Content Column */}
      <div className="md:col-span-6 flex flex-col justify-start pt-1">
        <h3 className="text-3xl font-bold font-serif text-slate-50 leading-tight group-hover:text-primary-100 transition-colors">
          {pub.title}
        </h3>
        
        <div className="mt-4 font-light">
          {formatAuthors(pub.authors)}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base mt-5">
          <span className="font-serif italic text-slate-200/85 font-medium border-b border-white/10 pb-0.5">
            {displayVenue}
          </span>
          {pub.status !== 'Published' && (
             <span className={`text-xs font-mono px-2 py-0.5 rounded-full transition-colors ${statusStyles[pub.status]}`}>
               {pub.status}
             </span>
          )}
        </div>
        
        <p className="text-sm md:text-base text-slate-200/70 mt-5 leading-relaxed max-w-3xl">
          {pub.description}
        </p>

        {/* Links Area */}
        <div className="flex flex-wrap gap-6 mt-10 pt-5 border-t border-white/10">
          {pub.links?.arxiv && (
            <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-200/70 hover:text-red-200 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <ScrollText size={16} className="text-slate-200/40 group-hover/link:text-red-200 transition-colors" /> arXiv
            </a>
          )}
          {pub.links?.pdf && (
            <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-200/70 hover:text-primary-200 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <FileText size={16} className="text-slate-200/40 group-hover/link:text-primary-200 transition-colors" /> PDF
            </a>
          )}
          {pub.links?.code && (
            <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-200/70 hover:text-white uppercase tracking-wide transition-colors pb-0.5 group/link">
              <Github size={16} className="text-slate-200/40 group-hover/link:text-white transition-colors" /> Code
            </a>
          )}
          {pub.links?.project && (
            <a href={pub.links.project} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-200/70 hover:text-primary-200 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <Globe size={16} className="text-slate-200/40 group-hover/link:text-primary-200 transition-colors" /> Project
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PublicationCard;
