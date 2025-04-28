'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useAnimate, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrambleText from '@/components/ScrambleText';

const dessins = [
  { src: '/images/IMG_3227.jpeg', title: 'Élévation architecturale', location: 'FACADE' },
  { src: '/images/IMG_3225.jpeg', title: 'Étude de main', location: 'MAIN' },
  { src: '/images/IMG_3224.jpeg', title: 'Ombre portée', location: 'OMBRE' }
];

export default function Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.dessin-card');
      let found = false;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.25 && rect.bottom > window.innerHeight * 0.25){

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
    <main ref={containerRef} className="relative bg-[#f9f9f6] text-gray-900 font-body">

      <motion.div ref={scope} className="fixed top-24 left-6 z-50 pointer-events-none">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-1"
          >
            {Array.from(dessins[activeIndex]?.location || '').map((letter, idx) => (
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
        {dessins.map((dessin, i) => (
          <DessinCard
            key={i}
            src={dessin.src}
            title={dessin.title}
            delay={i * 0.1}
          />
        ))}
      </div>
    </main>
  );
}

function DessinCard({ src, title, delay }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="dessin-card relative w-full border-b border-white"
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