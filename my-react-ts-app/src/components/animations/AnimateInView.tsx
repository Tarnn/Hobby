import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateInViewProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
  scale?: boolean;
  rotate?: boolean;
}

export default function AnimateInView({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className,
  scale = false,
  rotate = false
}: AnimateInViewProps) {
  const directions = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 }
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
    ...(scale && { scale: 0.8 }),
    ...(rotate && { rotate: -10 })
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: duration * 1.5 },
        scale: { duration: duration * 1.2 },
        rotate: { duration: duration * 1.2 }
      }}
    >
      {children}
    </motion.div>
  );
} 