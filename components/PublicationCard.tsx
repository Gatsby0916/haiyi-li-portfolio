
import React from 'react';
import { Publication } from '../types';
import { FileText, Github, Globe, ScrollText, ArrowUpRight, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PublicationCardProps {
  pub: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ pub }) => {
  // Function to highlight the user's name
  const formatAuthors = (authors: string[]) => {
    return authors.map((author, index) => {
      const isMe = author.includes("Haiyi Li");
      return (
        <span key={index} className={isMe ? "font-bold text-slate-900" : "text-slate-600"}>
          {author}
          {index < authors.length - 1 ? ", " : ""}
        </span>
      );
    });
  };

  const isContain = pub.imageFit === 'contain';
  const isPdf = pub.image?.toLowerCase().endsWith('.pdf');
  const containerBgClass = isContain ? 'bg-white' : 'bg-slate-100';
  const containerAspectClass = isPdf ? 'aspect-[4/3]' : (!isContain ? 'aspect-[16/10]' : '');
  const imageFitClass = isContain ? 'h-auto max-h-[420px] object-contain p-4' : 'h-full object-cover';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group flex flex-col md:grid md:grid-cols-12 gap-10 py-6 border-b border-slate-100 last:border-0"
    >
      {/* Image Column - Enlarged to 5/12 columns */}
      <div className="md:col-span-5">
        <div className={`relative w-full overflow-hidden rounded-lg border border-slate-200 ${containerBgClass} shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-slate-300 ${containerAspectClass}`}>
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
                  className={`w-full ${imageFitClass} opacity-95 group-hover:opacity-100 transition-opacity`}
                />
                {/* Overlay for interaction hint */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
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

      {/* Content Column - 7/12 columns */}
      <div className="md:col-span-7 flex flex-col justify-start pt-1">
        <h3 className="text-2xl font-bold font-serif text-slate-900 leading-tight group-hover:text-primary-900 transition-colors">
          {pub.title}
        </h3>
        
        <div className="text-base text-slate-600 mt-3 font-light leading-relaxed">
          {formatAuthors(pub.authors)}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-4">
          <span className="font-serif italic text-slate-800 font-medium border-b border-slate-200 pb-0.5">
            {pub.venue} {pub.year}
          </span>
          {pub.status !== 'Published' && (
             <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
               {pub.status}
             </span>
          )}
        </div>
        
        <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-3xl">
          {pub.description}
        </p>

        {/* Links Area */}
        <div className="flex flex-wrap gap-6 mt-8 pt-4 border-t border-slate-100/50">
          {pub.links?.arxiv && (
            <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-700 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <ScrollText size={16} className="text-slate-400 group-hover/link:text-red-600 transition-colors" /> arXiv
            </a>
          )}
          {pub.links?.pdf && (
            <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary-800 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <FileText size={16} className="text-slate-400 group-hover/link:text-primary-600 transition-colors" /> PDF
            </a>
          )}
          {pub.links?.code && (
            <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <Github size={16} className="text-slate-400 group-hover/link:text-slate-900 transition-colors" /> Code
            </a>
          )}
          {pub.links?.project && (
            <a href={pub.links.project} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary-800 uppercase tracking-wide transition-colors pb-0.5 group/link">
              <Globe size={16} className="text-slate-400 group-hover/link:text-primary-600 transition-colors" /> Project
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PublicationCard;
