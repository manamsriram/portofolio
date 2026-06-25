'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 80;
const SPRING = { stiffness: 150, damping: 15, mass: 0.5 };

function RunningLetter({ char, className }: { char: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        rawX.set(-(dx / dist) * force);
        rawY.set(-(dy / dist) * force);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const onLeave = () => { rawX.set(0); rawY.set(0); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
}

export default function RunningName() {
  return (
    <>
      {'Sri Ram '.split('').map((char, i) => (
        <RunningLetter key={`f${i}`} char={char} className="text-text-primary" />
      ))}
      {'Mannam'.split('').map((char, i) => (
        <RunningLetter key={`l${i}`} char={char} className="text-electric-cyan" />
      ))}
    </>
  );
}
