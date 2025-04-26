'use client';
import Image from 'next/image';
import ScrambleText from '@/components/ScrambleText';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const mots = ['la photo', 'le dessin', 'le voyage', 'les sciences', 'le design'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mots.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 font-body bg-[#f9f9f6] text-gray-900">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl sm:text-4xl font-title tracking-tight">
          <ScrambleText text="GERMAIN Eliott" />
        </h1>

        <div className="flex flex-row flex-wrap items-start gap-x-4 gap-y-4">
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="w-24 h-32 sm:w-28 sm:h-36 bg-gray-100 shadow-md overflow-hidden shrink-0"
>
  <Image
    src="/profile.jpeg"
    alt="Photo de profil"
    width={300}
    height={400}
    className="object-cover w-full h-full"
    priority
  />
</motion.div>


          <div
            className="flex-1 text-base sm:text-lg text-gray-700 font-body leading-relaxed max-w-xl"
            style={{ overflowWrap: 'normal', wordBreak: 'keep-all', whiteSpace: 'normal' }}
          >
            <ScrambleText text="Eliott, 23 ans, je cherche aujourd’hui à devenir ébéniste. J’ai toujours aimé allier création et technique. Je vous présente ici mes réalisations." />
          </div>
        </div>

        {index === 0 ? (
  // Affiche le tout avec ScrambleText une seule fois au début
  <div className="mt-6 max-w-3xl text-xl sm:text-2xl text-gray-800 font-title leading-snug break-keep">
    <ScrambleText text={`J’aime explorer ${mots[0]}`} />
  </div>
) : (
  // Ensuite, version avec rotation sans scramble
  <div className="mt-6 max-w-3xl text-xl sm:text-2xl text-gray-800 font-title leading-snug break-keep">
    J’aime explorer{' '}
    <span
      className="inline-block relative align-baseline"
      style={{ height: '1.05em', width: '12ch' }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={mots[index]}
          initial={{ y: '100%', rotateX: 90, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          exit={{ y: '-100%', rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 font-bold text-black"
          style={{ display: 'inline-block' }}
        >
          {mots[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  </div>
)}


        <div className="h-18" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {[
            { href: '/photographie', label: 'Photographie', image: '/images/photo.jpg' },
            { href: '/design-web', label: 'Design Web', image: '/images/design-web.png' },
            { href: '/dessins', label: 'Dessin', image: '/images/dessin.png' },
            
          ].map(({ href, label, image }, i) => (
            <motion.a
              key={href}
              href={href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden border border-gray-300 transition-all bg-white shadow-sm"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-700 scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <h2 className="text-white text-xl font-title">
                    <ScrambleText text={label} />
                  </h2>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <footer className="mt-24 border-t border-gray-300 pt-8 text-sm text-gray-600 text-center space-y-2">
        <p>
          📸 Instagram :{' '}
          <a
            href="https://www.instagram.com/eli0tt_grn/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            @eli0tt_grn
          </a>
        </p>
        <p>
          ✉️ Email :{' '}
          <a href="mailto:eliott.germain@hotmail.fr" className="underline hover:text-black">
            eliott.germain@hotmail.fr
          </a>
        </p>
        <p>
          💻 GitHub :{' '}
          <a
            href="https://github.com/ESPEDUZA"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            github.com/ESPEDUZA
          </a>
        </p>
      </footer>
    </main>
  );
}