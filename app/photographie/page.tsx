'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useAnimate } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrambleText from '@/components/ScrambleText';



const photos = [
  { src: '/images/000071100008.jpg', title: 'Marché de nuit', location: 'SÉOUL' },
  { src: '/images/DSCF0932.jpg', title: 'Arc de Triomphe', location: 'PARIS' },
  { src: '/images/DSCF0921.jpg', title: 'Escalier mécanique', location: 'PARIS' },
  { src: '/images/DSCF0711.jpg', title: 'La Défense', location: 'PARIS' },
  { src: '/images/DSCF0628.jpg', title: 'Salle d\'attente', location: 'FONTENAY' },
  { src: '/images/000132980009.jpg', title: 'Crépuscule côtier', location: 'NAMIBIE' },
  { src: '/images/000132980012.jpg', title: 'Coucher de soleil industriel', location: 'NAMIBIE' }
];
export default function Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.photo-card');
      let found = false;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          if (index !== activeIndex) {
            animate(scope.current, { scale: [1, 1.1, 1] }, { duration: 0.6 });
            setActiveIndex(index);
          }
          found = true;
        }
      });
      if (!found && cards.length) {
        const last = cards[cards.length - 1];
        const rect = last.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight + 100) {
          setActiveIndex(cards.length - 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, animate, scope]);

  return (
    <main ref={containerRef} className="bg-[#f9f9f6] text-gray-900 font-body relative min-h-[150vh]">
      <motion.div ref={scope} className="fixed top-1/2 left-6 -translate-y-1/2 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-1"
          >
            {Array.from(photos[activeIndex]?.location || '').map((letter, idx) => (
              <span
                key={idx}
                className="text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-widest"
                style={{
                  letterSpacing: '0.25em',
                  color: 'white',
                  textShadow: '0 0 6px rgba(255,255,255,0.4)',
                }}
              >
                <ScrambleText text={letter} duration={300} />
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="flex flex-col">
        {photos.map((photo, i) => (
          <PhotoCard
            key={i}
            src={photo.src}
            title={photo.title}
            delay={i * 0.1}
          />
        ))}
      </div>
    </main>
  );
}

function PhotoCard({ src, title, delay }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="photo-card relative w-full border-b border-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Image
            src={src}
            alt={title}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
