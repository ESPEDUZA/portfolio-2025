'use client';
import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function ScrambleText({
  text,
  duration = 1500,
  className = '',
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const original = text.split('');
    const letterCount = original.length;
    const scrambleRounds = 30; // 👈 plus de "tours" = animation plus lente

    const scrambleIndexes = original.map((char) => ({
      final: char,
      current: char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)],
      countdown: char === ' ' ? 0 : Math.floor(Math.random() * scrambleRounds) + scrambleRounds,
    }));

    setOutput(scrambleIndexes.map((c) => c.current));

    const interval = setInterval(() => {
      let allDone = true;

      const updated = scrambleIndexes.map((c) => {
        if (c.final === ' ') return ' ';
        if (c.countdown > 0) {
          allDone = false;
          c.countdown--;
          c.current = chars[Math.floor(Math.random() * chars.length)];
          return c.current;
        } else {
          return c.final;
        }
      });

      setOutput(updated);

      if (allDone) {
        clearInterval(interval);
        setDone(true);
      }
    }, 20); // 👈 tick toutes les 50ms = plus smooth, plus lisible

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <span className={className} style={{ whiteSpace: 'pre-wrap' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            position: 'relative',
            width: 'auto',
            lineHeight: 'inherit',
            height: '1em',
          }}
        >
          {/* invisible text for layout */}
          <span style={{ visibility: 'hidden' }}>{char}</span>

          {/* animated layer */}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            {output[i]}
          </span>
        </span>
      ))}
    </span>
  );
}
